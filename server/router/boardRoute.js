const express = require('express');
const {createBoard, dismissBoard, updateBoard} = require('../controller/boardController')
const route = express.Router();

route.post('/create-board',createBoard);
route.put('/dismissed-board',dismissBoard);
route.put('/update-board',updateBoard);
module.exports = route;