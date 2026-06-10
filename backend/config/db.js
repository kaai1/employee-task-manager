const { Pool } = require('pg');
require('dotenv').config();

// Create a connection pool
// A pool manages multiple database connections efficiently
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test the connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Database connected successfully!');
    release();
  }
});

module.exports = pool;