const Venue = require('../../model/venueModel')
const User = require('../../model/userModel')

const VenueAddEvent = async (req, res) => {
    try {

        const user = req.user.id
        const venueId = req.params.id
        const { eventId } = req.body;
        const findVenue = await Venue.findById(venueId)

        const userInstance = await User.findById(user)

        if (userInstance.role !== "organizer") {
            return res.status(401).json({ message: "access denied  only organizer add event " })
        }
        if (!venueId) {
            return res.status(404).json({ message: " vanue params id missing" })
        }

        if (!findVenue) {
            return res.status(400).json({ message: "venue not found" })
        }

        await findVenue.events.push(eventId)
        await findVenue.save()

        return res.status(200).json({ message: "event added successfully venue ", findVenue })
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}


module.exports = VenueAddEvent