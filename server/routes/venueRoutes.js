const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const venueControllers = require('../controller/venueControllers');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/add-entries',[
   
    body('name').isLength({min:5}).withMessage("Name must be atleast 5 characters long"),
    body('location.address').isLength({min:5}).withMessage("Address must be atleast 5 characters long"),
    body('location.city').isLength({min:3}).withMessage("City must be atleast 3 characters long"),
    body('location.state').isLength({min:3}).withMessage("State must be atleast 3 characters long"),
    body('location.pin').isLength({min:6}).withMessage("Pin must be atleast 6 characters long"),
    body('description.line').isLength({min:5}).withMessage("Description must be atleast 5 characters long"),
    body('description.elaborated').isLength({min:5}).withMessage("Description must be atleast 5 characters long"),
    body('fare.indianAdult').isNumeric().withMessage("Indian Adult fare must be a number"),
    body('fare.indianChild').isNumeric().withMessage("Indian Child fare must be a number"),
    body('fare.foreignAdult').isNumeric().withMessage("Foreign Adult fare must be a number"),
    body('fare.foreignChild').isNumeric().withMessage("Foreign Child fare must be a number"),
    body('workingHours.opening.hour').isNumeric().withMessage("Opening hour must be a number"),
    body('workingHours.opening.minute').isNumeric().withMessage("Opening minute must be a number"),
    body('workingHours.closing.hour').isNumeric().withMessage("Closing hour must be a number"),
    body('workingHours.closing.minute').isNumeric().withMessage("Closing minute must be a number"),
    body('workingDays').isArray().withMessage("Working days must be an array"),
    body('workingDays.*').isIn(['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']).withMessage("Working days must be a valid day of the week"),
    body('typeofVenue').isIn(['Museum','Monuments', 'Urban_Attraction']).withMessage("Type must be a valid type"),
    body('imgLink').isURL().withMessage("Images must be a valid URL"),
    body('phNo').isMobilePhone().withMessage("Phone number must be a valid phone number")

    
],authMiddleware.authAdmin,venueControllers.addVenue);


router.get('/get-entries',[],authMiddleware.authAdmin,venueControllers.getAllVenue);
router.post('/login',(req,res)=>{});

module.exports = router;