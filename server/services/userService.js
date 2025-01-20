const userModel = require('../db/models/userModel');

module.exports.registerUser = async (obj) => {
    if (!obj) {
        return { error: 'Please provide all the details' };
    }
    try {
        const user = await userModel.create(obj);
        const token = await user.generateAuthToken();
        return {user, token};
    } catch (err) {
        return { error: err.message };
    }

}
module.exports.loginUser = async (obj) => {
    if (!obj) {
        return { error: 'Please provide all the details' };
    }
    try {
        const user = await userModel.findOne({ email: obj.email}).select("+password");
        if (!user) {
            return { error: 'Invalid email' };
        }   
        const passwordMatch = await user.comparePassword(obj.password);
        if (!passwordMatch) {
            return { error: 'Invalid password' };
        }
        const token = await user.generateAuthToken();
        return {user, token};
    }
    catch (err) {
        console.log(">>"); 
        return { error: err.message };
    }
}