const authorModel = require('../db/models/authorModel')

module.exports.addAuthor = async (obj)=>{
    if(!obj){
        return { error: 'Please provide all the details' };
    }

    try{
        const author = await authorModel.create(obj);
        return author
    }
    catch(err){
        return {error: err.message};
    }
}

module.exports.loginAuthor = async (obj)=>{
    if (!obj) {
        return { error: 'Please provide all the details' };
    }

    try{
        const user = await authorModel.findOne({email: obj.email}).select("+password");
        if (!user) {
            return { error: 'Invalid email' };
        }   
        const passwordMatch = await user.comparePassword(obj.password);
        if (!passwordMatch) {
            return { error: 'Invalid password' };
        }
        const token = await user.generateAuthToken();
        return {user, token};
    } catch (err) {
     
        throw new Error("server errors");
    }
}