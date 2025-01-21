const adminModel = require('../db/models/adminModel');

module.exports.addAdmin = async (obj) => {
    if (!obj) {
        return { error: 'Please provide all the details' };
    }try{
        const admin = await adminModel.create(obj);
        
        return admin;
    }catch(err){
        return {error: err.message};
    }
    
}

module.exports.loginAdmin = async (obj) => {
    if (!obj) {
        return { error: 'Please provide all the details' };
    }
    try{
        const admin = await adminModel.findOne({ email: obj.email }).select("+password");;
    if (!admin) {
        return { error: 'Invalid email' };
    }
    // const passwordMatch = await admin.comparePassword(obj.password);
    const passwordMatch = await admin.comparePassword(obj.password);
   
    if (!passwordMatch) {
        throw new Error('Invalid password');
    }
    const token = await admin.generateAuthToken();
    
    return  token;
    }
    catch(err){
        return {error: err.message};
    }
    

   
}
