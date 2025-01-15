const {validationResult} = require('express-validator');
const adminService = require('../services/adminService');
const adminModel = require('../db/models/adminModel');
const blackList = require('../db/models/blacklistToken');
const slotService = require('../services/slotService');

module.exports.addAdmin = async (req,res)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const admin = {
        name: req.body.name,
        email: req.body.email,
        password: await adminModel.hashPassword(req.body.password)
    };
    const result = await adminService.addAdmin(admin);

    res.status(201).json({result})
}
module.exports.loginAdmin = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(">>");
        return res.status(400).json({errors: errors.array()});
    }
    const admin = {
        email: req.body.email,
        password: req.body.password
    };
   
    const token = await adminService.loginAdmin(admin);

    console.log(token);
    res.cookie('token', token).status(201).redirect('/add-venue');
    
    
}
module.exports.logoutAdmin = async (req,res)=>{
    const token = req.token;
    const blackListed = await blackList.create({token});

    res.clearCookie('token');
    res.status(200).redirect('/');
}

module.exports.addSlot = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const creatorId = req.user._id;
    const venueDetails = await venueService.getVenuebyCreatorId(creatorId);
    const slot = {
        venueId: venueDetails._id,
        date: req.body.date,
        slots: req.body.slots,
        maxCapacity: req.body.maxCapacity,
        elasticCapacity: req.body.elasticCapacity,

    }
    const result = await slotService.addSlot(slot);
    res.status(201).json({result});
}