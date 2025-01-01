const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const userRouter = require('./router/userRouter');
const boardRouter = require('./router/boardRoute');
const taskRouter = require('./router/taskRouter');

dotenv.config();
const port = process.env.PORT || 3000; // Use environment variable for port or default to 3000
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to Database
connectDb()
    .then(() => {
        // Routes
        app.use('/api/users', userRouter);
        app.use('/api/boards', boardRouter);
        app.use('/api/tasks', taskRouter);

        // Start Server
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to the database', err);
        process.exit(1); // Exit the process with failure
    });