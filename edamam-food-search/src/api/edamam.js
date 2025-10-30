/**
 * Open Food Facts API Module
 * Handles all API requests to Open Food Facts API
 * Note: Open Food Facts is a free, open database that doesn't require API keys!
 */

const BASE_URL = 'https://world.openfoodfacts.org';
const USER_AGENT = 'EdamamFoodSearch/1.0 (Educational Project)'; // Required by Open Food Facts

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

  const trimmedQuery = query.trim().toLowerCase();
  
  // Check cache first
  const cached = getFromCache(`search:${trimmedQuery}`);
  if (cached) {
    console.log('Returning cached results for:', trimmedQuery);
    return cached;
  }

  try {
    // Open Food Facts search endpoint
    const url = `${BASE_URL}/cgi/search.pl?search_terms=${encodeURIComponent(trimmedQuery)}&search_simple=1&action=process&json=1&page_size=20&fields=code,product_name,brands,categories,image_url,nutriments,serving_size,quantity`;
    
    const response = await fetchWithRetry(url, {
      headers: {
        'User-Agent': USER_AGENT
      }
    });
    const data = await response.json();
    
    // Parse and format the results
    const results = data.products?.map(product => ({
      foodId: product.code,
      label: product.product_name || 'Unknown Product',
      brand: product.brands || null,
      category: product.categories?.split(',')[0]?.trim() || null,
      image: product.image_url || null,
      servingSize: product.serving_size || product.quantity || null,
      nutrients: {
        ENERC_KCAL: product.nutriments?.['energy-kcal_100g'] || product.nutriments?.['energy-kcal'] || 0,
        PROCNT: product.nutriments?.proteins_100g || product.nutriments?.proteins || 0,
        FAT: product.nutriments?.fat_100g || product.nutriments?.fat || 0,
        CHOCDF: product.nutriments?.carbohydrates_100g || product.nutriments?.carbohydrates || 0,
        FIBTG: product.nutriments?.fiber_100g || product.nutriments?.fiber || 0,
        SUGAR: product.nutriments?.sugars_100g || product.nutriments?.sugars || 0,
        NA: product.nutriments?.sodium_100g || product.nutriments?.sodium || 0,
        CHOLE: product.nutriments?.cholesterol_100g || product.nutriments?.cholesterol || 0
      },
      measures: [
        { uri: 'per_100g', label: 'per 100g' },
        { uri: 'per_serving', label: product.serving_size ? `per serving (${product.serving_size})` : 'per serving' }
      ],
      rawProduct: product // Keep raw data for detailed view
    })).filter(product => product.label && product.label !== 'Unknown Product') || [];
    
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
 * @param {string} foodId - Food barcode/ID from Open Food Facts
 * @param {string} label - Food label/name
 * @param {object} measureUri - Measure URI object (optional)
 * @param {number} quantity - Quantity (default: 1)
 * @returns {Promise<object>} Nutrient details
 */
export async function getFoodNutrients(foodId, label, measureUri = null, quantity = 1) {
  const cacheKey = `nutrients:${foodId}:${measureUri?.uri || 'default'}:${quantity}`;
  
  // Check cache first
  const cached = getFromCache(cacheKey);
  if (cached) {
    console.log('Returning cached nutrients for:', label);
    return cached;
  }

  try {
    // Get product details from Open Food Facts
    const url = `${BASE_URL}/api/v2/product/${foodId}.json`;
    
    const response = await fetchWithRetry(url, {
      headers: {
        'User-Agent': USER_AGENT
      }
    });
    
    const data = await response.json();
    
    if (!data.product) {
      throw new Error('Product not found');
    }
    
    const product = data.product;
    const nutriments = product.nutriments || {};
    
    // Determine multiplier based on measure type and quantity
    let multiplier = quantity;
    const isPer100g = !measureUri || measureUri.uri === 'per_100g';
    
    if (!isPer100g && measureUri?.uri === 'per_serving') {
      // Try to calculate serving size in grams
      const servingSize = product.serving_quantity || 100; // Default to 100g if not specified
      multiplier = (servingSize / 100) * quantity;
    }
    
    // Format the nutrient data (Open Food Facts provides per 100g by default)
    const nutrients = {
      calories: Math.round((nutriments['energy-kcal_100g'] || nutriments['energy-kcal'] || 0) * multiplier),
      protein: Math.round((nutriments.proteins_100g || nutriments.proteins || 0) * multiplier * 10) / 10,
      fat: Math.round((nutriments.fat_100g || nutriments.fat || 0) * multiplier * 10) / 10,
      carbs: Math.round((nutriments.carbohydrates_100g || nutriments.carbohydrates || 0) * multiplier * 10) / 10,
      fiber: Math.round((nutriments.fiber_100g || nutriments.fiber || 0) * multiplier * 10) / 10,
      sugar: Math.round((nutriments.sugars_100g || nutriments.sugars || 0) * multiplier * 10) / 10,
      sodium: Math.round((nutriments.sodium_100g || nutriments.sodium || 0) * multiplier * 1000 * 10) / 10, // Convert to mg
      cholesterol: Math.round((nutriments.cholesterol_100g || nutriments.cholesterol || 0) * multiplier * 1000 * 10) / 10, // Convert to mg
      weight: Math.round(100 * multiplier * 10) / 10, // Weight in grams
      saturatedFat: Math.round((nutriments['saturated-fat_100g'] || nutriments['saturated-fat'] || 0) * multiplier * 10) / 10,
      salt: Math.round((nutriments.salt_100g || nutriments.salt || 0) * multiplier * 10) / 10,
      allNutrients: nutriments
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

/**
 * Fetch a random food item. This tries a broad search and picks one product at random.
 * Falls back to a small list of seed queries if the broad search returns no results.
 * @returns {Promise<object|null>} A single product object in the same shape as searchFoods items or null
 */
export async function getRandomFood() {
  // Try a broad query first (empty search with large page_size)
  const tryFetch = async (query) => {
    try {
      const url = `${BASE_URL}/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=100&fields=code,product_name,brands,categories,image_url,nutriments,serving_size,quantity`;
      const response = await fetchWithRetry(url, {
        headers: { 'User-Agent': USER_AGENT }
      });
      const data = await response.json();
      const products = data.products || [];
      return products.map(product => ({
        foodId: product.code,
        label: product.product_name || 'Unknown Product',
        brand: product.brands || null,
        category: product.categories?.split(',')[0]?.trim() || null,
        image: product.image_url || null,
        servingSize: product.serving_size || product.quantity || null,
        nutrients: {
          ENERC_KCAL: product.nutriments?.['energy-kcal_100g'] || product.nutriments?.['energy-kcal'] || 0,
        },
        rawProduct: product
      })).filter(p => p.label && p.label !== 'Unknown Product');
    } catch (err) {
      console.warn('Random fetch attempt failed for query', query, err.message || err);
      return [];
    }
  };

  // First try a very broad fetch (empty query) — some servers accept it
  let items = await tryFetch('');

  // If no items, try a few seed queries
  const seeds = ['chocolate', 'bread', 'milk', 'cheese', 'juice', 'rice', 'apple', 'cereal'];
  let i = 0;
  while ((!items || items.length === 0) && i < seeds.length) {
    items = await tryFetch(seeds[i]);
    i += 1;
  }

  if (!items || items.length === 0) return null;

  const rand = items[Math.floor(Math.random() * items.length)];
  return rand;
}
