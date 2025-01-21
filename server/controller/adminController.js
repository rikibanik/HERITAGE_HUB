const {validationResult} = require('express-validator');
const adminService = require('../services/adminService');
const adminModel = require('../db/models/adminModel');
const blackList = require('../db/models/blacklistToken');


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

    res.status(201).redirect('/');
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
    const isAdmin = await adminModel.findOne({email: admin.email}).select('+password');;
    if(!isAdmin){
        return res.status(400).json("INVALID CREDENTIAL");
    }
    console.log("here")
    const isMatch = await isAdmin.comparePassword(admin.password);
    if(!isMatch){
        return res.status(400).json({message: 'Invalid details'});
    }
    
    const token =await isAdmin.generateAuthToken();
    res.cookie('token',token);
    res.status(201).redirect('/add-venue');
    
}
module.exports.logoutAdmin = async (req,res)=>{
    res.clearCookie('token');
    const token = req.cookies.token || (req.header('Authorization') && req.header('Authorization').split(' ')[1]);
    await blackList.create({token});
    res.status(200).redirect('/');
}