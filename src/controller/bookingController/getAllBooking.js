const Booking = require('../../model/bookingEventModel')


const getAllBooking = async (req, res) => {
    try {

        const getallBooking = await Booking.find()
        if (!getallBooking) {
            return res.status(404).json({ message: "booking not found" })
        }

        return res.status(200).json({ message: "get all booking event find", getallBooking })

    } catch (error) {
        return res.status(505).json({ message: error })
    }
}

module.exports = getAllBooking