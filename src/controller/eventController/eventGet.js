const Event = require('../../model/eventModel')



const eventGet = async (req, res) => {
    try {

        const user = req.user.id
        const eventId = req.params.id

        const eventGet = await Event.findOne({ _id: eventId, createdBy: user })


        if (!eventGet) {
            return res.status(404).json({ message: "event not found" })
        }

        return res.status(200).json({ message: "event get", eventGet })


    } catch (error) {
        return res.status(500).json({ message: error })
    }
}


module.exports = eventGet