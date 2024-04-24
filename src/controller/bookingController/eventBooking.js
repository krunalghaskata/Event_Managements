const Booking = require('../../model/bookingEventModel');
const Event = require('../../model/eventModel')
const User = require('../../model/userModel')

const eventBooking = async (req, res) => {
    try {
        const userId = req.user.id;
        const { eventId } = req.body;

        const event = await Event.findById(eventId);
        const user = await User.findById(userId);

        if (!event || !user) {
            return res.status(404).json({ message: "Event or User Not Found" });
        }

        const existingBooking = await Booking.findOne({ userId: userId });

        if (existingBooking) {
            const existingEventIndex = existingBooking.items.findIndex(item => item.eventId.toString() === eventId);
            if (existingEventIndex !== -1) {
                return res.status(400).json({ message: "Event Already Booked By The User" });
            } else {
                existingBooking.items.push({
                    eventId: eventId,
                    package: event.package
                });
                await existingBooking.save();
                return res.status(200).json({ message: "Event Booking Successfully", data: existingBooking });
            }
        } else {
            const newBooking = await Booking.create({
                userId: userId,
                items: [{
                    eventId: eventId,
                    package: event.package
                }],
            });
            return res.status(200).json({ message: "Event Booking Successfully", data: newBooking });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

module.exports = eventBooking;
