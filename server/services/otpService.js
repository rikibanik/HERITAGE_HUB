const otpModel = require('../db/models/otpModel');
const otpGenerator = require('otp-generator');
const twilio = require('twilio');
const bcrypt = require('bcrypt');
const accountSid = process.env.TWILIO_ACC_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN ;

const twilioClient = new twilio(accountSid, authToken) ;

module.exports.sendOTP = async (phoneNumber) => {
    if(!phoneNumber){
        throw Error("Phno number wrong");
    }
    //return phoneNumber;
    const otp = otpGenerator.generate(6,{lowerCaseAlphabets:false, specialChars:false, upperCaseAlphabets: false});
    //return otp;
    const cDate = new Date();
    const hashedOtp = await bcrypt.hash(otp,10);
    try{
        const otp = await otpModel.findOneAndUpdate(
            {phoneNumber},
            {otp: hashedOtp, expiresAt: new Date(cDate.getTime())},
            {upsert: true, new: true, setDefaultsOnInsert: true}
        )

        await twilioClient.messages.create({
            body: `Hey!! Your OTP is ${otp}. Expire in 10mins`,
            to: phoneNumber,
            from: process.env.TWILIO_PH_NO
        })

        return true;
    }catch(e){
        throw({status: "error while genearating", message: e.message});
    }
}