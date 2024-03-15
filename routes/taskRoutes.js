const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const auth = require('../middleware/auth');

// Create a new task
router.post('/', auth, async (req, res) => {
    const { title, description, dueDate, category, priority } = req.body;
    try {
        const newTask = new Task({
            title,
            description,
            dueDate,
            category,
            priority,
            user: req.user.id // Assuming the user's id is set by the auth middleware
        });
        const task = await newTask.save();
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update a task (mark as completed, change priority, etc.)
router.put('/:id', auth, async (req, res) => {
    const { title, description, dueDate, category, priority, status } = req.body;
    const taskFields = {};
    if (title) taskFields.title = title;
    if (description) taskFields.description = description;
    if (dueDate) taskFields.dueDate = dueDate;
    if (category) taskFields.category = category;
    if (priority) taskFields.priority = priority;
    if (status) taskFields.status = status;

    try {
        let task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ msg: 'Task not found' });

        // Ensure user owns task
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        task = await Task.findByIdAndUpdate(
            req.params.id,
            { $set: taskFields },
            { new: true }
        );

        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get all tasks of a user
router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id }).sort({ dueDate: -1 });
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get tasks by criteria (e.g., category, status)
router.get('/:criteria', auth, async (req, res) => {
    try {
        let tasks;
        if (['Work', 'Personal', 'Errands'].includes(req.params.criteria)) {
            tasks = await Task.find({ user: req.user.id, category: req.params.criteria });
        } else if (['Pending', 'Completed'].includes(req.params.criteria)) {
            tasks = await Task.find({ user: req.user.id, status: req.params.criteria });
        } else {
            return res.status(400).json({ msg: 'Invalid criteria' });
        }
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Delete a task
router.delete('/:id', auth, async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ msg: 'Task not found' });

        // Ensure user owns task
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await Task.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Task removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
