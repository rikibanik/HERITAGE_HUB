const { validationResult, ExpressValidator } = require('express-validator');
const authorService = require('../services/authorService');
const slotting = require('../services/slotting')

module.exports.loginAuthor = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const author= {
        email: req.body.email,
        password: req.body.password
    }
    const result = await authorService.loginAuthor(author);
    res.cookie('token', result.token)
    res.status(201).json({ message: "Successfully logged in" });
}
module.exports.addSlot = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    console.log(req.body);
    const slot = {
        venueId: req.user.venueId,
        date: req.body.date,
        slots: req.body.slots,
        maxCapacity: req.body.maxCapacity,
        elasticCapacity: req.body.elasticCapacity
    }
    try{
        const add = slotting.createSlot(slot)
        res.status(201).json("Slot Created")
    }catch(e){
        return res.status(400).json({message: e.message})
    }
    // res.json({slot})
    
}
module.exports.getSlots = async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const user= req.user;
    const venueId = user.venueId;
    try{
        const slotList = await slotting.getSlotsbyAuthor(venueId);
        res.status(201).json({slotList});
    }catch(e){
        res.status(400).json({message: e.message})
    }
    
}