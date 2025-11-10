import express from 'express';
import * as foodItemController from '../controllers/foodItemController.js';

const router = express.Router();

/**
 * Food Item Routes
 * Base path: /api/fooditems
 */

// GET /api/fooditems/categories - Get all categories (must be before /:id)
router.get('/categories', foodItemController.getAllCategories);

// GET /api/fooditems/search?q=searchTerm - Search food items
router.get('/search', foodItemController.searchFoodItems);

// GET /api/fooditems/category/:category - Get food items by category
router.get('/category/:category', foodItemController.getFoodItemsByCategory);

// GET /api/fooditems - Get all food items
router.get('/', foodItemController.getAllFoodItems);

// GET /api/fooditems/:id - Get a single food item
router.get('/:id', foodItemController.getFoodItemById);

// POST /api/fooditems - Create a new food item
router.post('/', foodItemController.createFoodItem);

// PUT /api/fooditems/:id - Update a food item
router.put('/:id', foodItemController.updateFoodItem);

// DELETE /api/fooditems/:id - Delete a food item
router.delete('/:id', foodItemController.deleteFoodItem);

export default router;
