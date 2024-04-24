const Venue = require('../../model/venueModel')
const User = require('../../model/userModel')


const updatevenue = async (req, res) => {
    try {

        const userId = req.user.id
        const venueId = req.params.id

        const userInstance = await User.findById(userId)

        if (userInstance.role !== "organizer") {
            return res.status(403).json({ message: "access denied organizer only update venue" })
        }
        if (!userInstance) {
            return res.status(404).json({ message: "user not found" })
        }

        const updated = await Venue.findByIdAndUpdate(
            venueId,
            { ...req.body },
            { new: true }
        )
        await updated.save()

        return res.status(200).json({ message: "updated venue sucessfully", updated })
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

module.exports = updatevenue