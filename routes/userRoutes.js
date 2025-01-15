const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controller/userController');
const { model } = require('mongoose');

router.post('/register',[
    body('name.firstname').isLength({min:3}).withMessage("Name must be atleast 3 characters long"),
    body('name.lastname').isLength({min:3}).withMessage("Name must be atleast 3 characters long"),
    body('email').isEmail().withMessage("Email must be a valid email"),
    body('password').isLength({min:5}).withMessage("Password must be atleast 5 characters long")
],userController.registerUser);
router.post('/login',[
    body('email').isEmail().withMessage("Email must be a valid email"),
    body('password').isLength({min:5}).withMessage("Password must be atleast 5 characters long")
],userController.loginUser);
module.exports = router;