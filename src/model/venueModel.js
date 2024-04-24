


const mongoose = require('mongoose')
const { Schema } = mongoose


const venueSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    capacity: { type: Number, required: true },
    contactPerson: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
    },
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
});


module.exports = mongoose.model("Venue", venueSchema)
