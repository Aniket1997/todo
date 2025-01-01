const express = require('express');
const { createBoard, dismissBoard, updateBoard } = require('../controller/boardController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create-board', authMiddleware, createBoard);
router.put('/dismissed-board', authMiddleware, dismissBoard);
router.put('/update-board', authMiddleware, updateBoard);

module.exports = router;