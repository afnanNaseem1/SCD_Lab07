const express = require('express');
const app = express();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

const PORT = 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
