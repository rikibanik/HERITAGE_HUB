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
            date: date
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
