const express = require('express');
const { createTask, deleteTask } = require('../controller/taskController');
const router=express.Router();

router.post("/create-task",createTask);
router.delete("/delete-task",deleteTask);

module.exports=router;
