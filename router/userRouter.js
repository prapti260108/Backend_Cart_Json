const express = require('express');
const { signup,login } = require('../controller/userController');
const AuthMiddleware = require("../Middleware/AuthMiddleware");
const router = express.Router();


// User signup
router.post('/signup',AuthMiddleware, signup);
// User login
router.post('/login', login);


module.exports = router;