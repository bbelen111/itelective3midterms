import express from 'express';
import * as foodController from '../controllers/foodController.js';

const router = express.Router();

// Search foods
router.get('/search', foodController.searchFoods);

// Get food nutrients
router.get('/nutrients/:foodId', foodController.getFoodNutrients);

// Get random food
router.get('/random', foodController.getRandomFood);

// Clear cache (useful for testing)
router.post('/cache/clear', foodController.clearCache);

export default router;
