const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
// const authMiddleware = require('../middleware/authMiddleware');
const authorController = require('../controller/authorController')

//remove later
router.get('/login',(req,res)=>{
    res.render('authorlogin')
})

//.........................
router.get('/dashboard',(req,res)=>{
    res.render('authordashboard') //Change later
})
router.post('/login', [
    body('email').isEmail().withMessage("Email must be a valid email"),
        body('password').isLength({min:5}).withMessage("Password must be atleast 5 characters long")
], authorController.loginAuthor);

module.exports = router;