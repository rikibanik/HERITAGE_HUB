const express = require('express');
const router = express.Router();
const razorpayInstance = require('../controller/razorpay');
const venueService = require('../services/venueService');
const orderModel = require('../db/models/orderModel')
const slotting = require('../services/slotting')
function generateUniqueId() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';

    let id = '';

    // Generate the first 4 letters
    for (let i = 0; i < 4; i++) {
        id += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    // Generate the next 3 numbers
    for (let i = 0; i < 3; i++) {
        id += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    // Generate the last letter
    id += letters.charAt(Math.floor(Math.random() * letters.length));

    return id;
}

// Endpoint to create an order
router.post('/create-order', async (req, res) => {
    const { amount,  venueId,slotId,slots } = req.body;
    const email = req.user.email;
    var totalSum = 0;
    slots.forEach(element => {
        totalSum += element;
    });
    // Start a session for transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Get user details
        const user = await userModel.findOne({ email }).select('_id').session(session);
        if (!user) {
            throw new Error('User not found.');
        }

        // Get venue details
        const venue = await venueService.getVenuebyId(venueId);
        if (!venue) {
            throw new Error('Venue not found.');
        }

        // Check slot availability
        const available = await slotting.checkAvailabilty(slotId);
        if (!available) {
            throw new Error('No slot available.');
        }

        // Update slot availability (reserve slot temporarily)
        const slot = await slotModel.findOneAndUpdate(
            { _id: slotId },
            { $inc: { currentBookings: totalSum } },
            { new: true, session }
        );
        if (slot.currentBookings > slot.maxCapacity) {
            throw new Error('Slot overbooked.');
        }
        const orderNumber = generateUniqueId();
        // Create Razorpay order
        const options = {
            amount: amount * 100, // Convert amount to smallest currency unit
            currency: 'INR',
            receipt: orderNumber,
            payment_capture: 1
        };
        const order = await razorpayInstance.orders.create(options);
        console.log(order);
        const newOrder = {
            userId: user._id,
            venueId: venueId,
            slotId: slotId,
            orderNum: orderNumber,
            amount: amount,
            // receiptNum to be added from razorpay
        }
        const createdOrder = await orderModel.create(newOrder);
        console.log(createdOrder);
        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        res.status(200).json(order);
    } catch (error) {
        // Abort the transaction in case of an error
        await session.abortTransaction();
        session.endSession();

        console.error(error);
        res.status(500).send({ error: error.message });
    }
    
});

module.exports = router;