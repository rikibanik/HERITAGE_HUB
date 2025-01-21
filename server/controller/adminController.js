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

    res.status(201).json({result})
}
module.exports.loginAdmin = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(">>");
        res.status(400).json({errors: errors.array()});
    }
    const admin = {
        email: req.body.email,
        password: req.body.password
    };
    const isAdmin = adminModel.find({email: admin.email});
    if(!isAdmin){
        res.status(400).json("INVALID CREDENTIAL");
    }
    try{
        const token = await adminService.loginAdmin(admin);
    if(token){
        console.log(token);
        res.cookie('token', token).status(201).redirect('/add-venue');
    }
    else{
        res.render('<script>INVALID</script>')
    }
    }catch(e){
        res.status(400).json({error:e})
    }
    
    
    
    
}
module.exports.logoutAdmin = async (req,res)=>{
    const token = req.token;
    const blackListed = await blackList.create({token});

    res.clearCookie('token');
    res.status(200).redirect('/');
}