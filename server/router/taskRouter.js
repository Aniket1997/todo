const express = require('express');
const { createTask, deleteTask, updateTask, getTasks } = require('../controller/taskController');
const router=express.Router();

router.post("/create-task",createTask);
router.delete("/delete-task",deleteTask);
router.put("/update-task",updateTask);
router.get("/tasks/:taskId?",getTasks);

module.exports=router;
