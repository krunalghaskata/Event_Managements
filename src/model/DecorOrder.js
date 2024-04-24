const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderDecorSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    items: [{
        DecorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Decoration',
            required: true,
        },
        quantity: {
            type: Number,
            default: 1
        },
        price: {
            type: Number,
        },
        status: {
            type: String,
            enum: ['cancel', 'pending', 'success'],
            default: 'pending'
        }
    }],
    totalPrice: {
        type: Number,
    }
});

module.exports = mongoose.model("OrderDecoration", orderDecorSchema); 
 