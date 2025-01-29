const { validationResult, ExpressValidator } = require('express-validator');

const venueService = require('../services/venueService');
const orderModel = require('../db/models/orderModel')
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
module.exports.createOrder = async(req,res)=>{
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {venueId,slotId,tickets } = req.body;
    const email = req.user.email;
    var totalSum = 0;
    Object.values(tickets).forEach(value => {
        totalSum += value;  // Add the value of each ticket type
    });
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
        const amount = tickets.indianAdult * venue.fare.indianAdult +
                        tickets.indianChild * venue.fare.indianChild +
                        tickets.foreignAdult * venue.fare.foreignAdult +
                        tickets.foreignChild * venue.fare.foreignChild ;
        // Check slot availability
        console.log(amount);
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
        
        if(amount==0){
            const freeOrder = {
                userId: user._id,
                venueId: venueId,
                slotId: slotId,
                tickets: tickets,
                orderNum: orderNumber,
                amount: amount,
                // receiptNum to be added from razorpay
            }
            try{
                const order = orderService.createOrder(freeOrder);
                res.status(201).json({message: "Order Created", order});
            }catch(e){
                res.status(400).json({message: "Unable to create order"})
            }
            

        }
        else{
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
            try{
                const order = orderService.createOrder(newOrder);
                res.status(201).json({message: "Order Created", order});
            }catch(e){
                res.status(400).json({message: "Unable to create order"})
            }
            console.log(createdOrder);
        }
        
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

}