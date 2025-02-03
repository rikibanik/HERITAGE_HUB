const { validationResult, ExpressValidator } = require('express-validator');
const userModel = require('../db/models/userModel');
const blackList = require('../db/models/blacklistToken');
const userService = require('../services/userService');
const otpService = require('../services/otpService');

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
        secure: false,   // Set to `true` if using HTTPS
        sameSite: 'lax'  // Adjust for cross-site requests
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
        secure: false,   // Set to `true` if using HTTPS
        sameSite: 'lax'  // Adjust for cross-site requests
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

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const {email} = req.body;
    console.log(email);
    try {
        const otpGen = await otpService.sendOTP(email);
        if(otpGen.status == false){
            res.status(400).json(otpGen)
        }
        res.status(200).json({message: "OTP SENT SUCCESSFULLY"})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
module.exports.verifyOtp = async (req,res)=>{
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email, otp} = req.body;
    try{
        const verify = await otpService.verifyOTP(email, otp);
        // res.json(verify)
        if(verify.status){
            // update user status to verified...
            await userService.updateUserStatus(email);
            res.status(201).json(verify);
        }
        else{
            res.status(500).json({message: verify.message})
        }
    }catch(e){
        res.status(400).json({message: e.message});
    }
}