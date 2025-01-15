const {validationResult} = require('express-validator');
const venueService = require('../services/venueService');

module.exports.addVenue = async (req,res)=>{
 
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
  
    const venue = {
        typeofVenue: req.body.typeofVenue,
        name: req.body.name,
        location: req.body.location,
        description: req.body.description,
        fare: req.body.fare,
        workingHours: req.body.workingHours,
        workingDays: req.body.workingDays,
        imgLink: req.body.imgLink,
        phNo: req.body.phNo,
        creatorId: req.user._id
    };
    const result = await venueService.addVenue(venue);

    res.status(201).json({result})
};

module.exports.getAllVenue = async (req,res)=>{
    const user = req.user;
    console.log(user);
    const id = user._id;
    try{
        const result = await venueService.getAllVenue();
        res.status(200).json(result);
    }catch(err){
        console.log(err);
    }
    
};