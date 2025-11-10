-- Food Search Database Schema

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS food_search_db;
USE food_search_db;

-- Drop table if exists
DROP TABLE IF EXISTS food_items;

-- Create food_items table
CREATE TABLE food_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  food_id VARCHAR(255) NOT NULL UNIQUE,
  product_name VARCHAR(500) NOT NULL,
  brand VARCHAR(255),
  category VARCHAR(255),
  image_url VARCHAR(1000),
  serving_size VARCHAR(100),
  
  -- Nutritional values (per 100g)
  calories DECIMAL(10,2) DEFAULT 0,
  protein DECIMAL(10,2) DEFAULT 0,
  fat DECIMAL(10,2) DEFAULT 0,
  carbohydrates DECIMAL(10,2) DEFAULT 0,
  fiber DECIMAL(10,2) DEFAULT 0,
  sugar DECIMAL(10,2) DEFAULT 0,
  sodium DECIMAL(10,2) DEFAULT 0,
  cholesterol DECIMAL(10,2) DEFAULT 0,
  saturated_fat DECIMAL(10,2) DEFAULT 0,
  salt DECIMAL(10,2) DEFAULT 0,
  
  -- Additional fields
  description TEXT,
  ingredients TEXT,
  
  -- Metadata
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_product_name (product_name),
  INDEX idx_brand (brand),
  INDEX idx_category (category),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert some sample data
INSERT INTO food_items (
  food_id, product_name, brand, category, serving_size,
  calories, protein, fat, carbohydrates, fiber, sugar, sodium, cholesterol, saturated_fat, salt,
  description, ingredients
) VALUES 
(
  'sample001',
  'Whole Wheat Bread',
  'Artisan Bakery',
  'Breads',
  '2 slices (60g)',
  247, 13.0, 4.0, 41.0, 6.0, 6.0, 491, 0, 0.8, 1.2,
  'Freshly baked whole wheat bread with a crispy crust',
  'Whole wheat flour, water, yeast, salt, sugar'
),
(
  'sample002',
  'Greek Yogurt',
  'Dairy Fresh',
  'Dairy Products',
  '1 cup (170g)',
  59, 10.0, 0.4, 3.6, 0, 3.2, 36, 5, 0.1, 0.09,
  'Low-fat Greek yogurt with live cultures',
  'Pasteurized milk, live active cultures'
),
(
  'sample003',
  'Almond Milk',
  'Plant Based Co',
  'Beverages',
  '1 cup (240ml)',
  17, 0.6, 1.1, 1.4, 0.4, 0, 176, 0, 0.1, 0.4,
  'Unsweetened almond milk, dairy-free alternative',
  'Filtered water, almonds, sea salt, sunflower lecithin, gellan gum'
);

-- Display created table structure
DESCRIBE food_items;

-- Display sample data
SELECT * FROM food_items;
