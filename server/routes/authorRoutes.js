const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const authorController = require('../controller/authorController')
const venueService = require('../services/venueService')
//remove later
router.get('/login',(req,res)=>{
    res.render('authorlogin')
})

//.........................
router.get('/dashboard',authMiddleware.authAuthor, async (req,res)=>{
    const venue = await venueService.getVenuebyId(req.user.venueId)
    const details ={
        name: venue.name,
        location: venue.location,
        imgLink: venue.imgLink
    }
    res.render('authordashboard',{details}) //Change later
    // res.status(201).json({details})
})
router.post('/login', [
    body('email').isEmail().withMessage("Email must be a valid email"),
        body('password').isLength({min:5}).withMessage("Password must be atleast 5 characters long")
], authorController.loginAuthor);
router.post('/add-slot',[

    body('date').isDate().withMessage('Date must be a valid date'),

    body('slots').isArray().withMessage('Slots must be an array').custom((slots) => {
        for (let i = 0; i < slots.length; i++) {
            for (let j = i + 1; j < slots.length; j++) {
                const slotA = slots[i];
                const slotB = slots[j];
                const startA = new Date(0, 0, 0, slotA.startTime.hour, slotA.startTime.minute);
                const endA = new Date(0, 0, 0, slotA.endTime.hour, slotA.endTime.minute);
                const startB = new Date(0, 0, 0, slotB.startTime.hour, slotB.startTime.minute);
                const endB = new Date(0, 0, 0, slotB.endTime.hour, slotB.endTime.minute);

                if (startA < endB && endA > startB) {
                    throw new Error('Slots cannot overlap. Please choose different time frames.');
                }
            }
        }
        return true;
    }),

    // Validate 'maxCapacity' (must be a positive integer)
    body('maxCapacity').isInt({ min: 1 }).withMessage('Max capacity must be a positive integer'),

    // Validate 'elasticCapacity' (must be a positive integer)
    body('elasticCapacity').isInt({ min: 1 }).withMessage('Elastic capacity must be a positive integer'),

    


    
],authMiddleware.authAuthor, authorController.addSlot);
module.exports = router;