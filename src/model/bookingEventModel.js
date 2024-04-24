const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [{
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },

    bookingDate: {
      type: Date,
      default: Date.now,
    },
    package: {
      type: Number,
      required: true
    }

  }]


});

module.exports = mongoose.model('Booking', bookingSchema); 