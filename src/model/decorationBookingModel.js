const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [{
        DecorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Decoration',
            required: true,
        },

        createdAt: {
            type: Date,
            default: Date.now,
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }

    }],
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderDecoration'
    },
    totalPrice: {
        type: Number,
    }


});

module.exports = mongoose.model('BookingDecoration', bookingSchema); 