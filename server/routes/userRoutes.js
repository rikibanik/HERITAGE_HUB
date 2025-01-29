const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controller/userController');
const { authUser } = require('../middleware/authMiddleware');
const userModel = require('../db/models/userModel')
const authMiddleware = require('../middleware/authMiddleware')

const jwt = require('jsonwebtoken');

router.post('/register', [
    body('name.firstname').isLength({ min: 3 }).withMessage("Name must be atleast 3 characters long"),
    body('name.lastname').isLength({ min: 3 }).withMessage("Name must be atleast 3 characters long"),
    body('email').isEmail().withMessage("Email must be a valid email"),
    body('password').isLength({ min: 5 }).withMessage("Password must be atleast 5 characters long")
], userController.registerUser);
router.post('/login', [
    body('email').isEmail().withMessage("Email must be a valid email"),
    body('password').isLength({ min: 5 }).withMessage("Password must be atleast 5 characters long")
], userController.loginUser);
router.get('/data', authUser, async (req, res) => {
    const token = req.cookies.token
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const userData = await userModel.findOne({ "_id": decode._id })
    // console.log(userData)
    res.json(userData)
})

router.get('/logout',authMiddleware.authUser,userController.logoutUser);

module.exports = router;