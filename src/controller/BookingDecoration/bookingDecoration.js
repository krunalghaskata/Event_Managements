const BookingDecor = require('../../model/decorationBookingModel');
const Decor = require('../../model/decorationModel');
const User = require('../../model/userModel');

const DecorationBooking = async (req, res) => {
    try {
        const { userId, DecorId, quantity } = req.body;

        if (!req.user || req.user.id !== userId) {
            return res.status(403).json({ message: 'Forbiden' });
        }

        const user = await User.findById(userId);
        const decore = await Decor.findById(DecorId);

        if (!user) {
            return res.status(404).json({ message: 'User Not found' });
        }

        if (!decore) {
            return res.status(404).json({ message: 'Decoration Not Found' });
        }

        if (decore.quantity < quantity) {
            return res.status(400).json({ message: 'Out Of stack' });
        }

        let existingBookingDecor = await BookingDecor.findOne({ userId });

        if (existingBookingDecor) {
            const existingItem = existingBookingDecor.items.find(item => item?.DecorId.toString() === DecorId);

            if (existingItem) {
                const totalQuantity = existingItem.quantity + quantity;

                if (totalQuantity > decore.quantity) {
                    return res.status(400).json({ message: 'Limited stock' });
                }

                existingItem.quantity = totalQuantity;

                existingItem.price = decore.price * existingItem.quantity;
            } else {
                existingBookingDecor.items.push({
                    DecorId,
                    quantity,
                    price: decore.price * quantity
                });
            }
            existingBookingDecor.totalPrice = existingBookingDecor.items.reduce((total, item) => total + item.price, 0);

            await existingBookingDecor.save();
        } else {
            const newBooking = new BookingDecor({
                userId,
                items: [{
                    DecorId,
                    quantity,
                    price: decore.price * quantity
                }],
                totalPrice: decore.price * quantity
            });
            existingBookingDecor = await newBooking.save();
        }
        // decore.quantity -= quantity; // Update the quantity of the decoration
        await decore.save();

        res.status(200).json({ message: 'DECORATION_ADD_TO_CART', existingBookingDecor });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = DecorationBooking;
