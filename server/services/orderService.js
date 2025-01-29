const orderModel = require('../db/models/orderModel');

module.exports.createOrder = async (obj)=>{
    if (!obj) {
        return { error: 'Please provide all the details' };
    }
    try {
        const order = await orderModel.create(obj);
        return order;
    } catch (error) {
        throw new Error("unable to create order");
        
    }
}