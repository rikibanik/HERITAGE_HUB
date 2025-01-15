const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    venueId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Venue',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    slots: [
        {
            startTime: {
                hour: { type: Number, required: true },
                minute: { type: Number, required: true }
            },
            endTime: {
                hour: { type: Number, required: true },
                minute: { type: Number, required: true }
            }
        }
    ],
    maxCapacity: {
        type: Number,
        required: true
    },
    elasticCapacity: {
        type: Number,
        required: true
    },
    currentBookings: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically set the creation time
    }
});

// Index to expire documents (optional: if you want to delete them after 7 days)
slotSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7 * 24 * 60 * 60 });

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;
