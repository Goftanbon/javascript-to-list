const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin');



// GET routes
router.get('/', adminController.getTasks); // Assuming this is your home or default route

router.get('/tasks/active', adminController.getActiveTasks);
router.get('/tasks/completed', adminController.getCompletedTasks);
// router.get('/tasks/taskleft')

// POST routes
router.post('/add-todo', adminController.postNewTask);

// PATCH routes
router.patch('/update-task/:taskId', adminController.updateTaskStatus);

// DELETE routes
router.delete('/delete-task/:taskId', adminController.deleteTask);
router.delete('/tasks/clear-completed', adminController.clearCompletedTasks);

module.exports = router;
