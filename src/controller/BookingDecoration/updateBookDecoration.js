const BookingDecor = require('../../model/decorationBookingModel');
const Decor = require('../../model/decorationModel');

const UpdateBookingDecor = async (req, res) => {
    try {
        const objectId = req.params.id;

        const { itemId, quantity } = req.body;


        const BookingDecorData = await BookingDecor.findById(objectId);
      
        if (!BookingDecorData) {
            return res.status(404).json({ message: 'booking items not found' });
        }

        const itemsData = BookingDecorData.items.find(item => item._id == itemId);
       
        if (!itemsData) {
            return res.status(404).json({ message: 'items not found in cart' });
        }

        const decorData = await Decor.findById(itemsData.DecorId);
       

        const updatedPrice = decorData.price * quantity;
     
        itemsData.quantity = quantity;
        itemsData.price = updatedPrice;

        await BookingDecorData.save();

        return res.status(201).json({ message: "data updated successfully", itemsData });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = UpdateBookingDecor;
