const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const adminControllers = require('../controller/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const { exists } = require('../db/models/userModel');


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

router.post('/add-slot',[
    body('venueId').isString().withMessage("invalid venue_id"),
    // body('date'),exists().withMessage('invalid'),
    body('slots').isArray({min: 1}).withMessage('Invalid Slots'),
    body('maxCapacity').isNumeric().withMessage('Invalid max capacity'),
    body('elasticCapacity').isNumeric().withMessage('Invalid elastic capacity')

],authMiddleware.authAdmin,adminControllers.addSlot);
module.exports = router;