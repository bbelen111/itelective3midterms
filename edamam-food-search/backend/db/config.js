import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

/**
 * MySQL Database Connection Pool
 * Configure your database credentials in .env file
 */
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'food_search_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Get promise-based connection
const promisePool = pool.promise();

/**
 * Test database connection
 */
export const testConnection = async () => {
  try {
    const [rows] = await promisePool.query('SELECT 1');
    console.log('✓ Database connected successfully');
    return true;
  } catch (error) {
    console.error('✗ Database connection failed:', error.message);
    return false;
  }
};

export default promisePool;
