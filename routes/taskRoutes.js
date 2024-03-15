const express = require('express');
const { tasks, taskId } = require('../models/data'); // Import the array and taskId
const router = express.Router();

// Create a new task
router.post('/', (req, res) => {
    const { title, description, dueDate, category, priority } = req.body;
    const newTask = {
        id: ++taskId, // Increment taskId for each new task
        title,
        description,
        dueDate,
        category,
        priority,
        status: 'Pending' // Default status
    };
    tasks.push(newTask); // Add the new task to the array
    res.json(newTask);
});

// Update a task (mark as completed, change priority, etc.)
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const index = tasks.findIndex(task => task.id === parseInt(id));
    if (index === -1) return res.status(404).json({ msg: 'Task not found' });

    const updatedTask = { ...tasks[index], ...req.body };
    tasks[index] = updatedTask; // Update the task in the array
    res.json(updatedTask);
});

// Get all tasks
router.get('/', (req, res) => {
    res.json(tasks);
});

// Delete a task
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const index = tasks.findIndex(task => task.id === parseInt(id));
    if (index === -1) return res.status(404).json({ msg: 'Task not found' });

    tasks.splice(index, 1); // Remove the task from the array
    res.json({ msg: 'Task removed' });
});

module.exports = router;
