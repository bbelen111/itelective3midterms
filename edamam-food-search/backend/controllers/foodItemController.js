import * as foodItemModel from '../models/foodItemModel.js';

/**
 * Food Item Controller
 * Handles HTTP requests for food items in database
 */

/**
 * GET /api/fooditems
 * Get all food items
 */
export const getAllFoodItems = async (req, res) => {
  try {
    const foodItems = await foodItemModel.getAllFoodItems();
    res.json(foodItems);
  } catch (error) {
    console.error('Error in getAllFoodItems controller:', error);
    res.status(500).json({
      error: 'Failed to fetch food items',
      message: error.message
    });
  }
};

/**
 * GET /api/fooditems/:id
 * Get a single food item by ID
 */
export const getFoodItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const foodItem = await foodItemModel.getFoodItemById(id);
    
    if (!foodItem) {
      return res.status(404).json({
        error: 'Food item not found',
        message: `No food item found with ID ${id}`
      });
    }
    
    res.json(foodItem);
  } catch (error) {
    console.error('Error in getFoodItemById controller:', error);
    res.status(500).json({
      error: 'Failed to fetch food item',
      message: error.message
    });
  }
};

/**
 * GET /api/fooditems/search?q=searchTerm
 * Search food items
 */
export const searchFoodItems = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim().length === 0) {
      return res.status(400).json({
        error: 'Search term is required',
        message: 'Please provide a search term using the "q" query parameter'
      });
    }
    
    const foodItems = await foodItemModel.searchFoodItems(q);
    res.json(foodItems);
  } catch (error) {
    console.error('Error in searchFoodItems controller:', error);
    res.status(500).json({
      error: 'Failed to search food items',
      message: error.message
    });
  }
};

/**
 * POST /api/fooditems
 * Create a new food item
 */
export const createFoodItem = async (req, res) => {
  try {
    const foodData = req.body;
    
    // Validate required fields (only product_name is required, food_id will be auto-generated)
    if (!foodData.product_name) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'product_name is required'
      });
    }
    
    // Generate food_id if not provided
    if (!foodData.food_id || foodData.food_id === '') {
      foodData.food_id = `custom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    
    const newFoodItem = await foodItemModel.createFoodItem(foodData);
    res.status(201).json({
      message: 'Food item created successfully',
      data: newFoodItem
    });
  } catch (error) {
    console.error('Error in createFoodItem controller:', error);
    
    if (error.message.includes('already exists')) {
      return res.status(409).json({
        error: 'Duplicate entry',
        message: error.message
      });
    }
    
    res.status(500).json({
      error: 'Failed to create food item',
      message: error.message
    });
  }
};

/**
 * PUT /api/fooditems/:id
 * Update an existing food item
 */
export const updateFoodItem = async (req, res) => {
  try {
    const { id } = req.params;
    const foodData = req.body;
    
    // Validate required fields
    if (!foodData.product_name) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'product_name is required'
      });
    }
    
    const updatedFoodItem = await foodItemModel.updateFoodItem(id, foodData);
    res.json({
      message: 'Food item updated successfully',
      data: updatedFoodItem
    });
  } catch (error) {
    console.error('Error in updateFoodItem controller:', error);
    
    if (error.message.includes('not found')) {
      return res.status(404).json({
        error: 'Food item not found',
        message: error.message
      });
    }
    
    res.status(500).json({
      error: 'Failed to update food item',
      message: error.message
    });
  }
};

/**
 * DELETE /api/fooditems/:id
 * Delete a food item
 */
export const deleteFoodItem = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await foodItemModel.deleteFoodItem(id);
    res.json(result);
  } catch (error) {
    console.error('Error in deleteFoodItem controller:', error);
    
    if (error.message.includes('not found')) {
      return res.status(404).json({
        error: 'Food item not found',
        message: error.message
      });
    }
    
    res.status(500).json({
      error: 'Failed to delete food item',
      message: error.message
    });
  }
};

/**
 * GET /api/fooditems/category/:category
 * Get food items by category
 */
export const getFoodItemsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const foodItems = await foodItemModel.getFoodItemsByCategory(category);
    res.json(foodItems);
  } catch (error) {
    console.error('Error in getFoodItemsByCategory controller:', error);
    res.status(500).json({
      error: 'Failed to fetch food items by category',
      message: error.message
    });
  }
};

/**
 * GET /api/fooditems/categories
 * Get all categories
 */
export const getAllCategories = async (req, res) => {
  try {
    const categories = await foodItemModel.getAllCategories();
    res.json(categories);
  } catch (error) {
    console.error('Error in getAllCategories controller:', error);
    res.status(500).json({
      error: 'Failed to fetch categories',
      message: error.message
    });
  }
};
