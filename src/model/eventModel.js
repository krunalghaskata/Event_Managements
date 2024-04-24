const mongoose = require("mongoose");
const { Schema } = mongoose;

const eventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    package: {
        type: Number,
        required: true

    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
    role: {
        type: String,
        enum: ["user", "organizer", "attendees"],
        default: "organizer"
    },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

});

module.exports = mongoose.model("Event", eventSchema);