import db from '../db/config.js';

/**
 * Food Item Model
 * Handles all database operations for food items
 */

/**
 * Get all food items from database
 */
export const getAllFoodItems = async () => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM food_items ORDER BY created_at DESC'
    );
    return rows;
  } catch (error) {
    console.error('Database query error:', error);
    throw new Error(`Database error: ${error.message}`);
  }
};

/**
 * Get a single food item by ID
 */
export const getFoodItemById = async (id) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM food_items WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  } catch (error) {
    throw new Error(`Database error: ${error.message}`);
  }
};

/**
 * Get a food item by food_id (unique identifier)
 */
export const getFoodItemByFoodId = async (foodId) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM food_items WHERE food_id = ?',
      [foodId]
    );
    return rows[0] || null;
  } catch (error) {
    throw new Error(`Database error: ${error.message}`);
  }
};

/**
 * Search food items by name or brand
 */
export const searchFoodItems = async (searchTerm) => {
  try {
    const searchPattern = `%${searchTerm}%`;
    const [rows] = await db.query(
      `SELECT * FROM food_items 
       WHERE product_name LIKE ? 
          OR brand LIKE ? 
          OR category LIKE ?
       ORDER BY product_name`,
      [searchPattern, searchPattern, searchPattern]
    );
    return rows;
  } catch (error) {
    throw new Error(`Database error: ${error.message}`);
  }
};

/**
 * Create a new food item
 */
export const createFoodItem = async (foodData) => {
  try {
    const {
      food_id,
      product_name,
      brand,
      category,
      image_url,
      serving_size,
      calories,
      protein,
      fat,
      carbohydrates,
      fiber,
      sugar,
      sodium,
      cholesterol,
      saturated_fat,
      salt,
      description,
      ingredients
    } = foodData;

    const [result] = await db.query(
      `INSERT INTO food_items (
        food_id, product_name, brand, category, image_url, serving_size,
        calories, protein, fat, carbohydrates, fiber, sugar, sodium, 
        cholesterol, saturated_fat, salt, description, ingredients
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        food_id,
        product_name,
        brand || null,
        category || null,
        image_url || null,
        serving_size || null,
        calories || 0,
        protein || 0,
        fat || 0,
        carbohydrates || 0,
        fiber || 0,
        sugar || 0,
        sodium || 0,
        cholesterol || 0,
        saturated_fat || 0,
        salt || 0,
        description || null,
        ingredients || null
      ]
    );

    return {
      id: result.insertId,
      ...foodData
    };
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      throw new Error('A food item with this ID already exists');
    }
    throw new Error(`Database error: ${error.message}`);
  }
};

/**
 * Update an existing food item
 */
export const updateFoodItem = async (id, foodData) => {
  try {
    const {
      product_name,
      brand,
      category,
      image_url,
      serving_size,
      calories,
      protein,
      fat,
      carbohydrates,
      fiber,
      sugar,
      sodium,
      cholesterol,
      saturated_fat,
      salt,
      description,
      ingredients
    } = foodData;

    const [result] = await db.query(
      `UPDATE food_items SET
        product_name = ?,
        brand = ?,
        category = ?,
        image_url = ?,
        serving_size = ?,
        calories = ?,
        protein = ?,
        fat = ?,
        carbohydrates = ?,
        fiber = ?,
        sugar = ?,
        sodium = ?,
        cholesterol = ?,
        saturated_fat = ?,
        salt = ?,
        description = ?,
        ingredients = ?
      WHERE id = ?`,
      [
        product_name,
        brand || null,
        category || null,
        image_url || null,
        serving_size || null,
        calories || 0,
        protein || 0,
        fat || 0,
        carbohydrates || 0,
        fiber || 0,
        sugar || 0,
        sodium || 0,
        cholesterol || 0,
        saturated_fat || 0,
        salt || 0,
        description || null,
        ingredients || null,
        id
      ]
    );

    if (result.affectedRows === 0) {
      throw new Error('Food item not found');
    }

    return await getFoodItemById(id);
  } catch (error) {
    throw new Error(`Database error: ${error.message}`);
  }
};

/**
 * Delete a food item
 */
export const deleteFoodItem = async (id) => {
  try {
    const [result] = await db.query(
      'DELETE FROM food_items WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      throw new Error('Food item not found');
    }

    return { message: 'Food item deleted successfully' };
  } catch (error) {
    throw new Error(`Database error: ${error.message}`);
  }
};

/**
 * Get food items by category
 */
export const getFoodItemsByCategory = async (category) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM food_items WHERE category = ? ORDER BY product_name',
      [category]
    );
    return rows;
  } catch (error) {
    throw new Error(`Database error: ${error.message}`);
  }
};

/**
 * Get all categories
 */
export const getAllCategories = async () => {
  try {
    const [rows] = await db.query(
      'SELECT DISTINCT category FROM food_items WHERE category IS NOT NULL ORDER BY category'
    );
    return rows.map(row => row.category);
  } catch (error) {
    throw new Error(`Database error: ${error.message}`);
  }
};
