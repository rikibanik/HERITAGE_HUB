const slotModel = require('../db/models/slotModel');

module.exports.addSlot= async (obj)=>{
    if(!obj){
        return { error: 'Please provide all the details' };
    }
    try{
        const slot = await slotModel.create(obj);
        return slot;
1    }catch(err){
        return {error: err.message};
    }
}

