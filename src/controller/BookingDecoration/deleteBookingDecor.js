const BookDecor = require('../../model/decorationBookingModel')
const Decor = require('../../model/decorationModel')



const deleteBookingDecor = async (req, res) => {
    try {
        const objectId = req.params.id;
        const { itemId } = req.body;

        const BookindDecorData = await BookDecor.findById(objectId);

        if (!BookindDecorData) {
            return res.status(404).json({ message: getMessage('booking  decoration not found') });
        }
        const removedItem = BookindDecorData.items.find(item => item._id == itemId);

        if (!removedItem) {
            return res.status(404).json({ message: getMessage('item not found in Booking') });
        }

        await Decor.findById(removedItem.bookId);

        const updatedCart = await BookDecor.findByIdAndUpdate(
            objectId,
            { $pull: { items: { _id: itemId } } },
            { new: true }
        );

        if (updatedCart.items.length === 0) {
            await BookDecor.findByIdAndDelete(objectId)
            return res.json({ message: "CART_DELETED" })
        }
        return res.status(200).json({ message: "booking item deleted", updatedCart });

    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

module.exports = deleteBookingDecor