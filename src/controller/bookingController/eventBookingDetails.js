const Booking = require('../../model/bookingEventModel')


const eventBookingDetails = async (req, res) => {
    try {
        const User = req.user.id;
        const BookingId = req.params.id

        const eventBookingDetailsFind = await Booking.findById({ _id: BookingId, userId: User }).populate({ path: "userId" })
        if (!eventBookingDetailsFind) {
            return res.status(404).json({ message: "Event Booking Details Not Found" })
        }
        return res.status(200).json({ message: "Event Booking Details Find", eventBookingDetailsFind })

    } catch (error) {
        return error;
    }
}

module.exports = eventBookingDetails