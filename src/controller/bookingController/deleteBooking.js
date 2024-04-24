const Booking = require('../../model/bookingEventModel')


const bookingDelete = async (req, res) => {
    try {
        const objectId = req.params.id;
        const { itemId } = req.body;

        const BookinData = await Booking.findById(objectId);


        if (!BookinData) {
            return res.status(404).json({ message: "Booking Not Found" });
        }
        const removedItem = BookinData.items.find(item => item._id == itemId);

        if (!removedItem) {
            return res.status(404).json({ message: 'Item not found in Booking' });
        }

        const BookingDelete = await Booking.findByIdAndUpdate(
            objectId,
            { $pull: { items: { _id: itemId } } },
            { new: true }
        )

        if (BookingDelete.items.length === 0) {
            await Booking.findByIdAndDelete(objectId)
            return res.status(200).json({ message: "booking instance delete " })
        }

        return res.status(200).json({ message: "book item delete successfuuly", BookingDelete })

    } catch (error) {
        return res.status(500).json({ message: error })
    }
}


module.exports = bookingDelete
