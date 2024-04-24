const BookingDecor = require('../../model/decorationBookingModel')
const OrderDecor  = require('../../model/DecorOrder')



const OrederDecoration  = async (req,res)=>{
    try {
        const { BookingDecorId } = req.params;
        const userId = req.user.id;

        const BookingDecors = await BookingDecor.findOne({ BookingDecorId }).populate("items.DecorId");
       

        if (!BookingDecors) {
            return res.status(404).json({ message: ' cart BookingDecors not found'});
        }

        const orderItems = BookingDecors.items.map(item => ({
            DecorId: item.DecorId._id,
            quantity: item.quantity,
            price: item.DecorId.price,
        }));

        let totalPrice = 0;

        for (const item of BookingDecors.items) {
            if (item.DecorId.quantity < item.quantity) {
                return res.status(400).json({ message:'out of stock'});
            }

            totalPrice += item.DecorId.price * item.quantity;
        }

        if (BookingDecors.items.length === 0) {
            return res.json({ message: "cart empty" });
        }

        // Remove items from cart
        await BookingDecor.updateOne({ _id: BookingDecors._id }, { $unset: { items: [] } });

        // Update book quantities
        for (const item of BookingDecors.items) {
            const Decor = item.DecorId;
            Decor.quantity -= item.quantity;
            await Decor.save();
        }

        // Create order
        const order = new OrderDecor({
            BookingDecorId,
            userId,
            items: orderItems,
            totalPrice: totalPrice
        });

        await order.save();

        await BookingDecor.findByIdAndDelete(BookingDecors._id);

        return res.status(201).json({ message:  "order successfully", order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports =OrederDecoration