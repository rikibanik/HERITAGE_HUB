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
    dateofBooking: {
        type: Date,
        default: () => {
            let now = new Date();
            let istOffset = 5.5 * 60 * 60 * 1000; // Offset for IST (5 hours 30 minutes)
            return new Date(now.getTime() + istOffset);
        }
    },
    status:{
        type: String
    },
    receiptId:{
        type: String
    },
    typeOfOrder:{
        type: String
    }
})
const Order = mongoose.model('Order',orderSchema);
module.exports = Order;