const pool = require('../config/db');

const getAllTasks = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT t.*, e.name as employee_name, e.email as employee_email
      FROM tasks t
      LEFT JOIN employees e ON t.assigned_to = e.id
      ORDER BY t.created_at DESC
    `);
    res.json({ message: 'Tasks fetched successfully', tasks: result.rows });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT t.*, e.name as employee_name, e.email as employee_email
      FROM tasks t
      LEFT JOIN employees e ON t.assigned_to = e.id
      WHERE t.id = $1
    `, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task fetched successfully', task: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, priority, due_date } = req.body;
    const result = await pool.query(`
      INSERT INTO tasks (title, description, priority, due_date, status)
      VALUES ($1, $2, $3, $4, 'pending') RETURNING *
    `, [title, description, priority || 'medium', due_date]);
    res.status(201).json({ message: 'Task created successfully', task: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const assignTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { employee_id } = req.body;
    const taskExists = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    if (taskExists.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    const employeeExists = await pool.query('SELECT * FROM employees WHERE id = $1', [employee_id]);
    if (employeeExists.rows.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    const result = await pool.query(`
      UPDATE tasks SET assigned_to = $1 WHERE id = $2 RETURNING *
    `, [employee_id, id]);
    res.json({ message: 'Task assigned successfully', task: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, title, description, priority, due_date } = req.body;

    console.log('Update request received:', { id, status, title });

    const taskExists = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    if (taskExists.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const currentTask = taskExists.rows[0];

    const newTitle = title !== undefined && title !== '' ? title : currentTask.title;
    const newDescription = description !== undefined && description !== '' ? description : currentTask.description;
    const newPriority = priority !== undefined && priority !== '' ? priority : currentTask.priority;
    const newDueDate = due_date !== undefined && due_date !== '' ? due_date : currentTask.due_date;
    const newStatus = status !== undefined && status !== '' ? status : currentTask.status;

    console.log('New status will be:', newStatus);

    const result = await pool.query(`
      UPDATE tasks
      SET title = $1, description = $2, priority = $3, due_date = $4, status = $5
      WHERE id = $6
      RETURNING *
    `, [newTitle, newDescription, newPriority, newDueDate, newStatus, id]);

    console.log('Updated task:', result.rows[0]);

    res.json({ message: 'Task updated successfully', task: result.rows[0] });
  } catch (error) {
    console.log('Error updating task:', error.message);
    res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const taskExists = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    if (taskExists.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT * FROM tasks WHERE assigned_to = $1 ORDER BY created_at DESC
    `, [id]);
    res.json({ message: 'Tasks fetched successfully', tasks: result.rows });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  assignTask,
  updateTaskStatus,
  deleteTask,
  getMyTasks
};