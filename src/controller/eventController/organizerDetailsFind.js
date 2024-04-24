const Event = require('../../model/eventModel')



const organizerDetailsFind = async (req, res) => {
    try {

        const eventId = req.params.id
        const user = req.user.id


        const details = await Event.findOne({ _id: eventId, createdBy: user }).populate({ path: "createdBy" })

        if (!details) {
            return res.status(404).json({ message: "event organizer details not found" })
        }
        return res.status(200).json({ message: "Event details created by the organizer", details })

    } catch (error) {
        return res.status(500).json({ message: error })
    }
}


module.exports = organizerDetailsFind

