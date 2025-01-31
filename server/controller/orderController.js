const { validationResult, ExpressValidator } = require('express-validator');

const venueService = require('../services/venueService');

const slotting = require('../services/slotting')
const mongoose = require('mongoose')
const userModel = require('../db/models/userModel');
const slotModel = require('../db/models/slotModel');
const orderService = require('../services/orderService');
const razorpayInstance = require('../controller/razorpay')
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
module.exports.createOrder = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    console.log("hello");
    const { venueId, slotId, tickets } = req.body;
    const email = req.user.email;
    let totalSum = 0;
    
    Object.values(tickets).forEach(value => {
        totalSum += value;
    });
    console.log(totalSum)
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

        const amount = 
            (tickets.indianAdult || 0) * venue.fare.indianAdult +
            (tickets.indianChild || 0) * venue.fare.indianChild +
            (tickets.foreignAdult || 0) * venue.fare.foreignAdult +
            (tickets.foreignChild || 0) * venue.fare.foreignChild;

        console.log(amount);

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

        if (!slot) {
            throw new Error('Slot not found.');
        }

        console.log(slot.currentBookings);
        console.log(slot.maxCapacity);

        if (slot.currentBookings > slot.maxCapacity) {
            throw new Error('Slot overbooked.');
        }

        const orderNumber = generateUniqueId();
        let order;

        if (amount === 0) {
            const freeOrder = {
                userId: user._id,
                venueId: venueId,
                slotId: slotId,
                tickets: tickets,
                orderNum: orderNumber,
                amount: amount,
            };

            order = await orderService.createOrder(freeOrder);
        } else {
            const options = {
                amount: amount * 100, // Convert amount to smallest currency unit
                currency: 'INR',
                receipt: orderNumber,
                payment_capture: 1
            };

            const razorpayOrder = await razorpayInstance.orders.create(options);
            console.log(razorpayOrder);

            const newOrder = {
                userId: user._id,
                venueId: venueId,
                slotId: slotId,
                orderNum: orderNumber,
                amount: amount,
            };

            order = await orderService.createOrder(newOrder);
        }

        // Commit the transaction **only if everything goes well**
        await session.commitTransaction();
        session.endSession();

        return res.status(201).json({ message: "Order Created", order });

    } catch (error) {
        // Only abort if the transaction is still active
        if (session.inTransaction()) {
            await session.abortTransaction();
        }
        session.endSession();

        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};
