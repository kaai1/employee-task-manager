const pool = require('../config/db');

const getAllEmployees = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM employees ORDER BY created_at DESC'
    );
    res.json({
      message: 'Employees fetched successfully',
      employees: result.rows
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT * FROM employees WHERE id = $1', [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({
      message: 'Employee fetched successfully',
      employee: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createEmployee = async (req, res) => {
  try {
    const { name, email, phone, address, designation } = req.body;
    const exists = await pool.query(
      'SELECT * FROM employees WHERE email = $1', [email]
    );
    if (exists.rows.length > 0) {
      return res.status(400).json({ message: 'Employee already exists' });
    }
    const result = await pool.query(
      `INSERT INTO employees (name, email, phone, address, designation)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, email, phone, address, designation]
    );
    res.status(201).json({
      message: 'Employee created successfully',
      employee: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address, designation } = req.body;
    const exists = await pool.query(
      'SELECT * FROM employees WHERE id = $1', [id]
    );
    if (exists.rows.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    const result = await pool.query(
      `UPDATE employees
       SET name=$1, email=$2, phone=$3, address=$4, designation=$5
       WHERE id=$6 RETURNING *`,
      [name, email, phone, address, designation, id]
    );
    res.json({
      message: 'Employee updated successfully',
      employee: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const exists = await pool.query(
      'SELECT * FROM employees WHERE id = $1', [id]
    );
    if (exists.rows.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    await pool.query('DELETE FROM employees WHERE id = $1', [id]);
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
};