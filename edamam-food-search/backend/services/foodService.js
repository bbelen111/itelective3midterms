/**
 * Open Food Facts Service
 * Handles all API requests to Open Food Facts API
 */

const BASE_URL = 'https://world.openfoodfacts.org';
const USER_AGENT = 'EdamamFoodSearch/1.0 (Educational Project)';

const searchCache = new Map();
const MAX_CACHE_SIZE = 10;

const MAX_RETRIES = 3;
const BASE_DELAY = 2000; // Increased to 2 seconds
const FETCH_TIMEOUT = 15000; // 15 second timeout

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetch with timeout
 */
async function fetchWithTimeout(url, options = {}, timeout = FETCH_TIMEOUT) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Request timeout - API took too long to respond');
    }
    throw error;
  }
}

/**
 * Fetch with exponential backoff retry for various error responses
 */
async function fetchWithRetry(url, options = {}, retryCount = 0) {
  try {
    const response = await fetchWithTimeout(url, options);
    
    // Retry on rate limiting
    if (response.status === 429 && retryCount < MAX_RETRIES) {
      const delay = BASE_DELAY * Math.pow(2, retryCount);
      console.warn(`Rate limited (429). Retrying in ${delay}ms... (Attempt ${retryCount + 1}/${MAX_RETRIES})`);
      await sleep(delay);
      return fetchWithRetry(url, options, retryCount + 1);
    }
    
    // Retry on server errors (500, 502, 503, 504)
    if ([500, 502, 503, 504].includes(response.status) && retryCount < MAX_RETRIES) {
      const delay = BASE_DELAY * Math.pow(2, retryCount);
      console.warn(`Server error (${response.status}). Retrying in ${delay}ms... (Attempt ${retryCount + 1}/${MAX_RETRIES})`);
      await sleep(delay);
      return fetchWithRetry(url, options, retryCount + 1);
    }
    
    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      if ([500, 502, 503, 504].includes(response.status)) {
        throw new Error('The food database is temporarily unavailable. Please try again in a moment.');
      }
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return response;
  } catch (error) {
    // Retry on network errors or timeouts
    if (retryCount < MAX_RETRIES && (
      error.message.includes('fetch') || 
      error.message.includes('timeout') ||
      error.message.includes('ECONNRESET') ||
      error.message.includes('ETIMEDOUT')
    )) {
      const delay = BASE_DELAY * Math.pow(2, retryCount);
      console.warn(`Network error: ${error.message}. Retrying in ${delay}ms... (Attempt ${retryCount + 1}/${MAX_RETRIES})`);
      await sleep(delay);
      return fetchWithRetry(url, options, retryCount + 1);
    }
    throw error;
  }
}

function addToCache(key, value) {
  if (searchCache.size >= MAX_CACHE_SIZE) {
    const firstKey = searchCache.keys().next().value;
    searchCache.delete(firstKey);
  }
  searchCache.set(key, {
    data: value,
    timestamp: Date.now()
  });
}


function getFromCache(key) {
  const cached = searchCache.get(key);
  if (cached && (Date.now() - cached.timestamp) < 5 * 60 * 1000) {
    return cached.data;
  }
  return null;
}


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
    const url = `${BASE_URL}/cgi/search.pl?search_terms=${encodeURIComponent(trimmedQuery)}&search_simple=1&action=process&json=1&page_size=20&fields=code,product_name,brands,categories,image_url,nutriments,serving_size,quantity`;
    
    const response = await fetchWithRetry(url, {
      headers: {
        'User-Agent': USER_AGENT
      }
    });
    const data = await response.json();
    
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
      rawProduct: product
    })).filter(product => product.label && product.label !== 'Unknown Product') || [];
    
    addToCache(`search:${trimmedQuery}`, results);
    
    return results;
  } catch (error) {
    console.error('Error searching foods:', error);
    throw error;
  }
}

export async function getFoodNutrients(foodId, label, measureUri = null, quantity = 1) {
  const cacheKey = `nutrients:${foodId}:${measureUri?.uri || 'default'}:${quantity}`;
  
  const cached = getFromCache(cacheKey);
  if (cached) {
    console.log('Returning cached nutrients for:', label);
    return cached;
  }

  try {
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
    
    let multiplier = quantity;
    const isPer100g = !measureUri || measureUri.uri === 'per_100g';
    
    if (!isPer100g && measureUri?.uri === 'per_serving') {
      const servingSize = product.serving_quantity || 100;
      multiplier = (servingSize / 100) * quantity;
    }
    
    const nutrients = {
      calories: Math.round((nutriments['energy-kcal_100g'] || nutriments['energy-kcal'] || 0) * multiplier),
      protein: Math.round((nutriments.proteins_100g || nutriments.proteins || 0) * multiplier * 10) / 10,
      fat: Math.round((nutriments.fat_100g || nutriments.fat || 0) * multiplier * 10) / 10,
      carbs: Math.round((nutriments.carbohydrates_100g || nutriments.carbohydrates || 0) * multiplier * 10) / 10,
      fiber: Math.round((nutriments.fiber_100g || nutriments.fiber || 0) * multiplier * 10) / 10,
      sugar: Math.round((nutriments.sugars_100g || nutriments.sugars || 0) * multiplier * 10) / 10,
      sodium: Math.round((nutriments.sodium_100g || nutriments.sodium || 0) * multiplier * 1000 * 10) / 10,
      cholesterol: Math.round((nutriments.cholesterol_100g || nutriments.cholesterol || 0) * multiplier * 1000 * 10) / 10,
      weight: Math.round(100 * multiplier * 10) / 10,
      saturatedFat: Math.round((nutriments['saturated-fat_100g'] || nutriments['saturated-fat'] || 0) * multiplier * 10) / 10,
      salt: Math.round((nutriments.salt_100g || nutriments.salt || 0) * multiplier * 10) / 10,
      allNutrients: nutriments
    };
    
    addToCache(cacheKey, nutrients);
    
    return nutrients;
  } catch (error) {
    console.error('Error fetching nutrients:', error);
    throw error;
  }
}

export async function getRandomFood() {
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

  let items = await tryFetch('');

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

export function clearCache() {
  searchCache.clear();
}
