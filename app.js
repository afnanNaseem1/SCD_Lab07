const express = require('express');
const app = express();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

const PORT = 3000;

const server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Stop the server after a few seconds (e.g., 10 seconds)
const stopServerAfterSeconds = 10;
setTimeout(() => {
    console.log(`Stopping server after ${stopServerAfterSeconds} seconds...`);
    server.close();
}, stopServerAfterSeconds * 500);
