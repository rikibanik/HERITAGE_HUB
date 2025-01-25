const slotModel = require('../db/models/slotModel');

module.exports.createSlot = async (obj) => {
    try {
        if (!obj) {
            return { error: 'Please provide all the details' };
        }

        const { venueId, date, slots } = obj;

        // Step 1: Query existing slots for the same date and venueId
        const existingSlots = await slotModel.find({
            venueId: venueId,
            date: date,
            slots: slots
        });

        if(existingSlots){
            throw new Error('Slots already exist for the given date and venue');
        }

        // Step 3: Save new slots to the database
        const newSlotData = slotModel.create(obj);
        

        return { success: true, message: 'Slot created successfully', newSlotData };
    } catch (err) {
        console.error(err);
        return { error: 'An error occurred while creating the slot' };
    }
};

// Here we need to ad function to manage crowd if booking is more than max cap
module.exports.checkAvailabilty = async (slotId) => {
    if (!slotId) {
        throw new Error('No slot ID provided.');
    }
    try {
        const slot = await slotModel.findOne({ _id: slotId });
        if (!slot) {
            throw new Error('Slot not found.');
        }

        const { maxCapacity, currentBookings } = slot;
        if (currentBookings >= maxCapacity) {
            return false;
        }
        return true;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

