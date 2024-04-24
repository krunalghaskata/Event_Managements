const mongoose = require("mongoose");
const { Schema } = mongoose;

const partySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        require: true
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});


module.exports = mongoose.model("Party", partySchema)