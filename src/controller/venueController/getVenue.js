const Venue = require('../../model/venueModel')


const getVenue = async (req, res) => {
    try {

        const userId = req.user.id
 
        const getVenue = await Venue.findById(userId)
 
        if (!getVenue) {
            return res.status(404).json({ message: "not found venue" })
        }
        return res.status(200).json({ message: "get venue success", getVenue })

    } catch (error) {
        return res.status(500).json({ message: error })
    }
}


module.exports = getVenue