const express = require('express');
const {signup, login, getAllUsers} = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.get('/getUsers',authMiddleware,getAllUsers);

module.exports = router;
