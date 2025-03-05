const express = require('express');
const { signup,login, logout } = require('../controller/userController');

const router = express.Router();


// User signup
router.post('/signup', signup);
// User login
router.post('/login', login);
// User logout
router.post('/logout',logout)


module.exports = router;

