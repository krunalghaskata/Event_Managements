const BookingDecor = require('../../model/decorationBookingModel');

const getBookingDecorDetails = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const userId = req.user.id;

        if (!bookingId) {
            return res.status(404).json({ message: "ID not found" });
        }

        const bookingDecorDetails = await BookingDecor.findOne({ _id: bookingId, userId: userId }).populate('userId');

        if (!bookingDecorDetails) {
            return res.status(404).json({ message: "Booking decor details not found" });
        }

        return res.status(200).json({ message: "Booking decoration details found", bookingDecorDetails });
    } catch (error) {

        return res.status(500).json({ message: error });
    }
};

module.exports = getBookingDecorDetails;
