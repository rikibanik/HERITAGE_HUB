const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const adminControllers = require('../controller/adminController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/register',[
    body('name').isLength({min:5}).withMessage("Name must be atleast 5 characters long"),
    body('email').isEmail().withMessage("Email must be a valid email"),
    body('password').isLength({min:5}).withMessage("Password must be atleast 5 characters long")
],adminControllers.addAdmin);

router.post('/login',[
    body('email').isEmail().withMessage("Email must be a valid email"),
    body('password').isLength({min:5}).withMessage("Password must be atleast 5 characters long")
],adminControllers.loginAdmin);
router.get('/logout',authMiddleware.authAdmin,adminControllers.logoutAdmin);
module.exports = router;