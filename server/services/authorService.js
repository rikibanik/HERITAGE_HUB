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