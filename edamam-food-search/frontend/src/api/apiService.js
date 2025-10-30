/**
 * Frontend API Service
 * Communicates with the backend API instead of directly calling external APIs
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Handle API errors
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ 
      error: 'Request failed', 
      message: response.statusText 
    }));
    throw new Error(error.message || error.error);
  }
  return response.json();
};

/**
 * Search for foods by query string
 * @param {string} query - Search query
 * @returns {Promise<Array>} Array of food items
 */
export async function searchFoods(query) {
  if (!query || query.trim().length === 0) {
    return [];
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/foods/search?query=${encodeURIComponent(query)}`
    );
    return handleResponse(response);
  } catch (error) {
    console.error('Error searching foods:', error);
    throw error;
  }
}

/**
 * Get detailed nutrients for a food item
 * @param {string} foodId - Food barcode/ID
 * @param {string} label - Food label/name
 * @param {object} measureUri - Measure URI object (optional)
 * @param {number} quantity - Quantity (default: 1)
 * @returns {Promise<object>} Nutrient details
 */
export async function getFoodNutrients(foodId, label, measureUri = null, quantity = 1) {
  try {
    const params = new URLSearchParams({
      label,
      quantity: quantity.toString()
    });

    if (measureUri) {
      params.append('measureUri', JSON.stringify(measureUri));
    }

    const response = await fetch(
      `${API_BASE_URL}/foods/nutrients/${foodId}?${params.toString()}`
    );
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching nutrients:', error);
    throw error;
  }
}

/**
 * Fetch a random food item
 * @returns {Promise<object|null>} A single product object or null
 */
export async function getRandomFood() {
  try {
    const response = await fetch(`${API_BASE_URL}/foods/random`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching random food:', error);
    throw error;
  }
}

/**
 * Clear the cache (useful for testing)
 */
export async function clearCache() {
  try {
    const response = await fetch(`${API_BASE_URL}/foods/cache/clear`, {
      method: 'POST'
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error clearing cache:', error);
    throw error;
  }
}
