import * as foodService from '../services/foodService.js';

/**
 * Search for foods
 */
export const searchFoods = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const results = await foodService.searchFoods(query);
    res.json(results);
  } catch (error) {
    console.error('Error in searchFoods controller:', error);
    res.status(500).json({ 
      error: 'Failed to search foods', 
      message: error.message 
    });
  }
};

/**
 * Get food nutrients
 */
export const getFoodNutrients = async (req, res) => {
  try {
    const { foodId } = req.params;
    const { label, measureUri, quantity } = req.query;

    if (!foodId || !label) {
      return res.status(400).json({ 
        error: 'foodId and label are required' 
      });
    }

    const parsedMeasureUri = measureUri ? JSON.parse(measureUri) : null;
    const parsedQuantity = quantity ? parseFloat(quantity) : 1;

    const nutrients = await foodService.getFoodNutrients(
      foodId, 
      label, 
      parsedMeasureUri, 
      parsedQuantity
    );
    
    res.json(nutrients);
  } catch (error) {
    console.error('Error in getFoodNutrients controller:', error);
    res.status(500).json({ 
      error: 'Failed to fetch nutrients', 
      message: error.message 
    });
  }
};

/**
 * Get random food
 */
export const getRandomFood = async (req, res) => {
  try {
    const randomFood = await foodService.getRandomFood();
    
    if (!randomFood) {
      return res.status(404).json({ 
        error: 'No random food found', 
        message: 'Please try again' 
      });
    }

    res.json(randomFood);
  } catch (error) {
    console.error('Error in getRandomFood controller:', error);
    res.status(500).json({ 
      error: 'Failed to fetch random food', 
      message: error.message 
    });
  }
};

/**
 * Clear cache
 */
export const clearCache = async (req, res) => {
  try {
    foodService.clearCache();
    res.json({ message: 'Cache cleared successfully' });
  } catch (error) {
    console.error('Error in clearCache controller:', error);
    res.status(500).json({ 
      error: 'Failed to clear cache', 
      message: error.message 
    });
  }
};
