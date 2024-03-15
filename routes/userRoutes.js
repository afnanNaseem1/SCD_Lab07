const express = require('express');
const { users, userId } = require('../models/data'); // Import the array and userId
const router = express.Router();

// Register a new user (simplified version without real authentication for demonstration)
router.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    const newUser = { id: ++userId, name, email, password };
    users.push(newUser); // Add the new user to the array
    res.json({ id: newUser.id, name, email }); // Respond without password for security
});

// Simplified login (WARNING: not secure, just for example)
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email && user.password === password);
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    res.json({ msg: 'Logged in successfully' }); // Simplified response
});

// Get user data (simplified version)
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(user => user.id === parseInt(id));
    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.json({ id: user.id, name: user.name, email: user.email });
});

module.exports = router;
