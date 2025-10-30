/**
 * Frontend API Service
 * Communicates with the backend API instead of directly calling external APIs
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Handle API errors with user-friendly messages
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ 
      error: 'Request failed', 
      message: response.statusText 
    }));
    
    // Provide user-friendly messages for common errors
    let userMessage = error.message || error.error;
    
    if (response.status === 504 || response.status === 503) {
      userMessage = 'The food database is temporarily slow or unavailable. Please try again in a moment.';
    } else if (response.status === 429) {
      userMessage = 'Too many requests. Please wait a moment and try again.';
    } else if (response.status === 500) {
      userMessage = 'Server error. Please try again later.';
    }
    
    throw new Error(userMessage);
  }
  return response.json();
};


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


export async function getRandomFood() {
  try {
    const response = await fetch(`${API_BASE_URL}/foods/random`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching random food:', error);
    throw error;
  }
}

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
