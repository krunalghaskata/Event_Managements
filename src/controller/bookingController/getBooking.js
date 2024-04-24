const Booking = require('../../model/bookingEventModel')

const getBooking = async (req, res) => {
    try {
        const userId = req.user.id

        const getEventBooking = await Booking.findOne({ userId })

        if (!getEventBooking) {
            return res.status(404).json({ message: "user not get Event Booking" })
        }

        return res.status(200).json({ message: " get event booking  successfully", getEventBooking })

    } catch (error) {
        return res.status(500).json({ message: error })
    }
}


module.exports = getBooking

