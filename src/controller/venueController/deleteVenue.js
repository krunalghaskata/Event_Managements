const Venue = require('../../model/venueModel')
const User = require('../../model/userModel')



const deleteVenue = async (req, res) => {
    try {

        const userId = req.user.id;
        const VenueId = req.params.id;

        const userInstance = await User.findById(userId)
        if (!userInstance) {
            return res.status(404).json({ message: "user not found" })
        }
        if (userInstance.role !== "organizer") {
            return res.status(403).json({ message: "access denied only organizer delete venue" })
        }

        const deleteVenue = await Venue.findByIdAndDelete(VenueId)
        if (!deleteVenue) {
            return res.status(404).json({ message: "venue not found" })
        }

        return res.status(200).json({ message: "venue delete sucessfully" })

    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

module.exports = deleteVenue