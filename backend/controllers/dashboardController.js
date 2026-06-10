const pool = require('../config/db');

const getDashboardStats = async (req, res) => {
  try {

    // Count total employees
    const totalEmployees = await pool.query(
      'SELECT COUNT(*) FROM employees'
    );

    // Count total tasks
    const totalTasks = await pool.query(
      'SELECT COUNT(*) FROM tasks'
    );

    // Count tasks by status
    const pendingTasks = await pool.query(
      "SELECT COUNT(*) FROM tasks WHERE status = 'pending'"
    );

    const inProgressTasks = await pool.query(
      "SELECT COUNT(*) FROM tasks WHERE status = 'in_progress'"
    );

    const completedTasks = await pool.query(
      "SELECT COUNT(*) FROM tasks WHERE status = 'completed'"
    );

    // Get recent tasks (last 5)
    const recentTasks = await pool.query(`
      SELECT
        t.*,
        e.name as employee_name
      FROM tasks t
      LEFT JOIN employees e ON t.assigned_to = e.id
      ORDER BY t.created_at DESC
      LIMIT 5
    `);

    // Get recent employees (last 5)
    const recentEmployees = await pool.query(`
      SELECT id, name, email, designation, created_at
      FROM employees
      ORDER BY created_at DESC
      LIMIT 5
    `);

    // Task priority breakdown
    const tasksByPriority = await pool.query(`
      SELECT priority, COUNT(*) as count
      FROM tasks
      GROUP BY priority
    `);

    // Send everything in one response
    res.json({
      message: 'Dashboard stats fetched successfully',
      stats: {
        employees: {
          total: parseInt(totalEmployees.rows[0].count)
        },
        tasks: {
          total: parseInt(totalTasks.rows[0].count),
          pending: parseInt(pendingTasks.rows[0].count),
          in_progress: parseInt(inProgressTasks.rows[0].count),
          completed: parseInt(completedTasks.rows[0].count)
        },
        priority_breakdown: tasksByPriority.rows,
        recent_tasks: recentTasks.rows,
        recent_employees: recentEmployees.rows
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardStats };