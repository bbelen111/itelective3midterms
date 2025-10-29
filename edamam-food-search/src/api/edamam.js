/**
 * Edamam API Module
 * Handles all API requests to Edamam Food Database API
 */

const APP_ID = import.meta.env.VITE_EDAMAM_APP_ID;
const APP_KEY = import.meta.env.VITE_EDAMAM_APP_KEY;
const BASE_URL = 'https://api.edamam.com/api/food-database/v2';

// In-memory cache for search results
const searchCache = new Map();
const MAX_CACHE_SIZE = 10;

// Exponential backoff retry configuration
const MAX_RETRIES = 2;
const BASE_DELAY = 1000; // 1 second

/**
 * Sleep utility for retry delays
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetch with exponential backoff retry for 429 responses
 */
async function fetchWithRetry(url, options = {}, retryCount = 0) {
  try {
    const response = await fetch(url, options);
    
    // Handle rate limiting with exponential backoff
    if (response.status === 429 && retryCount < MAX_RETRIES) {
      const delay = BASE_DELAY * Math.pow(2, retryCount);
      console.warn(`Rate limited (429). Retrying in ${delay}ms... (Attempt ${retryCount + 1}/${MAX_RETRIES})`);
      await sleep(delay);
      return fetchWithRetry(url, options, retryCount + 1);
    }
    
    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return response;
  } catch (error) {
    if (retryCount < MAX_RETRIES && error.message.includes('fetch')) {
      const delay = BASE_DELAY * Math.pow(2, retryCount);
      console.warn(`Network error. Retrying in ${delay}ms... (Attempt ${retryCount + 1}/${MAX_RETRIES})`);
      await sleep(delay);
      return fetchWithRetry(url, options, retryCount + 1);
    }
    throw error;
  }
}

/**
 * Manage cache with size limit
 */
function addToCache(key, value) {
  // Remove oldest entry if cache is full
  if (searchCache.size >= MAX_CACHE_SIZE) {
    const firstKey = searchCache.keys().next().value;
    searchCache.delete(firstKey);
  }
  searchCache.set(key, {
    data: value,
    timestamp: Date.now()
  });
}

/**
 * Get from cache if not expired (cache for 5 minutes)
 */
function getFromCache(key) {
  const cached = searchCache.get(key);
  if (cached && (Date.now() - cached.timestamp) < 5 * 60 * 1000) {
    return cached.data;
  }
  return null;
}

/**
 * Search for foods by query string
 * @param {string} query - Search query
 * @returns {Promise<Array>} Array of food items
 */
export async function searchFoods(query) {
  if (!query || query.trim().length === 0) {
    return [];
  }

  if (!APP_ID || !APP_KEY) {
    throw new Error('Edamam API credentials not configured. Please check your .env.local file.');
  }

  const trimmedQuery = query.trim().toLowerCase();
  
  // Check cache first
  const cached = getFromCache(`search:${trimmedQuery}`);
  if (cached) {
    console.log('Returning cached results for:', trimmedQuery);
    return cached;
  }

  try {
    const url = `${BASE_URL}/parser?app_id=${APP_ID}&app_key=${APP_KEY}&ingr=${encodeURIComponent(trimmedQuery)}&nutrition-type=cooking`;
    
    const response = await fetchWithRetry(url);
    const data = await response.json();
    
    // Parse and format the results
    const results = data.hints?.map(hint => ({
      foodId: hint.food.foodId,
      label: hint.food.label,
      brand: hint.food.brand || null,
      category: hint.food.category || null,
      image: hint.food.image || null,
      nutrients: hint.food.nutrients || {},
      measures: hint.measures || []
    })) || [];
    
    // Cache the results
    addToCache(`search:${trimmedQuery}`, results);
    
    return results;
  } catch (error) {
    console.error('Error searching foods:', error);
    throw error;
  }
}

/**
 * Get detailed nutrients for a food item
 * @param {string} foodId - Food ID
 * @param {string} label - Food label/name
 * @param {object} measureUri - Measure URI object (optional)
 * @param {number} quantity - Quantity (default: 1)
 * @returns {Promise<object>} Nutrient details
 */
export async function getFoodNutrients(foodId, label, measureUri = null, quantity = 1) {
  if (!APP_ID || !APP_KEY) {
    throw new Error('Edamam API credentials not configured. Please check your .env.local file.');
  }

  const cacheKey = `nutrients:${foodId}:${measureUri?.uri || 'default'}:${quantity}`;
  
  // Check cache first
  const cached = getFromCache(cacheKey);
  if (cached) {
    console.log('Returning cached nutrients for:', label);
    return cached;
  }

  try {
    const url = `${BASE_URL}/nutrients?app_id=${APP_ID}&app_key=${APP_KEY}`;
    
    // Prepare the request body
    const ingredient = {
      quantity: quantity,
      foodId: foodId
    };
    
    if (measureUri) {
      ingredient.measureURI = measureUri.uri;
    }

    const requestBody = {
      ingredients: [ingredient]
    };
    
    const response = await fetchWithRetry(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    
    const data = await response.json();
    
    // Format the nutrient data
    const nutrients = {
      calories: Math.round(data.calories || 0),
      protein: Math.round((data.totalNutrients?.PROCNT?.quantity || 0) * 10) / 10,
      fat: Math.round((data.totalNutrients?.FAT?.quantity || 0) * 10) / 10,
      carbs: Math.round((data.totalNutrients?.CHOCDF?.quantity || 0) * 10) / 10,
      fiber: Math.round((data.totalNutrients?.FIBTG?.quantity || 0) * 10) / 10,
      sugar: Math.round((data.totalNutrients?.SUGAR?.quantity || 0) * 10) / 10,
      sodium: Math.round((data.totalNutrients?.NA?.quantity || 0) * 10) / 10,
      cholesterol: Math.round((data.totalNutrients?.CHOLE?.quantity || 0) * 10) / 10,
      weight: Math.round((data.totalWeight || 0) * 10) / 10,
      allNutrients: data.totalNutrients || {}
    };
    
    // Cache the results
    addToCache(cacheKey, nutrients);
    
    return nutrients;
  } catch (error) {
    console.error('Error fetching nutrients:', error);
    throw error;
  }
}

/**
 * Clear the cache (useful for testing or manual refresh)
 */
export function clearCache() {
  searchCache.clear();
}
