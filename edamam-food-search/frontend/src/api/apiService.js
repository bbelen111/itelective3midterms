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

// ============================================
// Database Food Items API Functions
// ============================================

/**
 * Get all food items from database
 */
export async function getAllFoodItems() {
  try {
    const response = await fetch(`${API_BASE_URL}/fooditems`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching food items:', error);
    throw error;
  }
}

/**
 * Get a single food item by ID
 */
export async function getFoodItemById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/fooditems/${id}`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching food item:', error);
    throw error;
  }
}

/**
 * Search food items in database
 */
export async function searchFoodItems(searchTerm) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/fooditems/search?q=${encodeURIComponent(searchTerm)}`
    );
    return handleResponse(response);
  } catch (error) {
    console.error('Error searching food items:', error);
    throw error;
  }
}

/**
 * Create a new food item
 */
export async function createFoodItem(foodData) {
  try {
    const response = await fetch(`${API_BASE_URL}/fooditems`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(foodData)
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error creating food item:', error);
    throw error;
  }
}

/**
 * Update an existing food item
 */
export async function updateFoodItem(id, foodData) {
  try {
    const response = await fetch(`${API_BASE_URL}/fooditems/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(foodData)
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error updating food item:', error);
    throw error;
  }
}

/**
 * Delete a food item
 */
export async function deleteFoodItem(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/fooditems/${id}`, {
      method: 'DELETE'
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error deleting food item:', error);
    throw error;
  }
}

/**
 * Get food items by category
 */
export async function getFoodItemsByCategory(category) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/fooditems/category/${encodeURIComponent(category)}`
    );
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching food items by category:', error);
    throw error;
  }
}

/**
 * Get all categories
 */
export async function getAllCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/fooditems/categories`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}
