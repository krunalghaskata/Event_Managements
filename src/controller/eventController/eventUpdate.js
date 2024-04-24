
const Event = require('../../model/eventModel')
const User = require('../../model/userModel')


const eventUpdate = async (req, res) => {
    try {

        const userId = req.user.id

        const eventId = req.params.id



        const userInstance = await User.findById(userId)

        if (userInstance.role !== "organizer") {
            return res.status(404).json({ message: "access denied only organizer  updated event" })
        }

        const update = await Event.findByIdAndUpdate(
            { _id: eventId, createdBy: userId }, { ...req.body }, { new: true }
        )

        if (!update) {
            return res.status(404).json({ message: "id not match" })
        }

        await update.save()
        return res.status(200).json({ message: "updated event ", update })

    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

module.exports = eventUpdate