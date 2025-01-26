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
    res.status(201).json({ result });
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
        res.redirect('/author/dashboard')
    }catch(e){
        return res.status(400).json({message: e.message})
    }
    // res.json({slot})
    
}