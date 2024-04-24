const OrderDecor = require('../../model/DecorOrder')


const getOrderDecor = async (req, res) => {
    try {

        const userId = req.user.id

        const getOrderDecor = await OrderDecor.findOne({ userId })
        if (!getOrderDecor) {
            return res.status(404).json({ message: "decoration order not found" })
        }
        return res.status(200).json({ getOrderDecor })

    } catch (error) {

    }
}

module.exports = getOrderDecor