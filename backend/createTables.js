const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://employee_task_manager_db_user:SWwcC88loDKEyW11aTrOOAz0LK5GmGc4@dpg-d8kfh8eq1p3s73fhng7g-a.oregon-postgres.render.com/employee_task_manager_db',
  ssl: { rejectUnauthorized: false }
});

async function createTables() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'employee',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('users table created!');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS employees (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        phone VARCHAR(20),
        address TEXT,
        latitude DECIMAL(10,8),
        longitude DECIMAL(11,8),
        designation VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('employees table created!');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        priority VARCHAR(20) DEFAULT 'medium',
        status VARCHAR(20) DEFAULT 'pending',
        assigned_to INTEGER,
        due_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('tasks table created!');

    console.log('All tables created successfully!');
    process.exit(0);

  } catch (error) {
    console.log('Error:', error.message);
    process.exit(1);
  }
}

createTables();