const express = require('express');
const { createTask, deleteTask, updateTask, getTasks } = require('../controller/taskController');
const authMiddleware = require('../middleware/authMiddleware')
const router=express.Router();

router.post("/create-task",authMiddleware,createTask);
router.delete("/delete-task",authMiddleware,deleteTask);
router.put("/update-task",authMiddleware,updateTask);
router.get("/tasks/:taskId?",authMiddleware,getTasks);

module.exports=router;
