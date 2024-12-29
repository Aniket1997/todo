const express = require('express');
const {createBoard} = require('../controller/boardController')
const route = express.Router();

route.post('/create-board',createBoard);

module.exports = route;