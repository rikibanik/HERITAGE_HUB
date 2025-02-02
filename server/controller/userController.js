const { validationResult, ExpressValidator } = require('express-validator');
const userModel = require('../db/models/userModel');
const blackList = require('../db/models/blacklistToken');
const userService = require('../services/userService');
const otpSevice = require('../services/otpService');
const { generate } = require('otp-generator');

module.exports.registerUser = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const exist = await userModel.findOne({email: req.body.email});
    if(exist){
        return res.status(401).json({errors: "user with this email exist"})
    }
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: await userModel.hashPassword(req.body.password)
    };
    const result = await userService.registerUser(user);
    res.cookie('token', result.token,{
        httpOnly: true,  // Prevents JavaScript from accessing it
        secure: true,  //false // Set to `true` if using HTTPS
        sameSite: 'None',// Adjust for cross-site requests
        partitioned: true   //remove
    }).status(201).json({ result });

};
module.exports.loginUser = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        return res.status(400).json({ errors: errors.array() });
    }
    const user = {
        email: req.body.email,
        password: req.body.password
    };
    const result = await userService.loginUser(user);
    console.log(result.token)
    res.cookie('token', result.token,{
        httpOnly: true,  // Prevents JavaScript from accessing it
        secure: true, //false  // Set to `true` if using HTTPS
        sameSite: 'None',// Adjust for cross-site requests
        partitioned: true   //remove
    })
    res.status(201).json({ result });
}
module.exports.logoutUser = async (req,res)=>{
    res.clearCookie('token');
    const token = req.cookies.token || (req.header('Authorization') && req.header('Authorization').split(' ')[1]);
    await blackList.create({token});
    res.status(200).redirect('/');
}
module.exports.generateOtp = async (req,res)=>{
    const errors = validationResult(req);
    const {phoneNumber} = req.body;
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const generateOtp = await otpSevice.sendOTP(phoneNumber);
        if(generateOtp){
            res.status(201).json({message: "OTP generated"})
        }
        res.status(401).json({message: "Unable to genrate"});
    } catch (error) {
        return res.status(400).json({status: false, message: error.message})
    }
}