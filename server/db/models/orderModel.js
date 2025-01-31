const mongoose = require('mongoose');

const orderSchema= new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    venueId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Venue',
        required: true,
    },
    slotId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Slot',
        required: true
    },
    orderNum:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        default: 0
    },
    receiptNum:{
        type: String,
        
    },
    dateofBooking:{
        type: Date,
        default: Date.now
    },
    status:{
        type: String
    },
    receiptId:{
        type: String
    }
})
const Order = mongoose.model('Order',orderSchema);
module.exports = Order;