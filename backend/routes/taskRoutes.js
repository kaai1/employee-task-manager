const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  getTaskById,
  createTask,
  assignTask,
  updateTaskStatus,
  deleteTask,
  getMyTasks
} = require('../controllers/taskController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/employee/:id', protect, getMyTasks);
router.get('/', protect, adminOnly, getAllTasks);
router.post('/', protect, adminOnly, createTask);
router.post('/:id/assign', protect, adminOnly, assignTask);
router.get('/:id', protect, getTaskById);
router.put('/:id', protect, updateTaskStatus);
router.delete('/:id', protect, adminOnly, deleteTask);

module.exports = router;