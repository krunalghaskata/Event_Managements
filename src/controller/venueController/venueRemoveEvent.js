const Venue = require("../../model/venueModel");


const venueRemoveEvent = async (req, res) => {
    try {
        const venueId = req.params.id;
        const { itemId } = req.body;

        const findVenue = await Venue.findById(venueId);

        if (!findVenue) {
            return res.status(404).json({ message: "Venue not found" });
        }

        const findEventRemoveIndex = findVenue.events.findIndex(item => item._id == itemId);

        if (findEventRemoveIndex === -1) {
            return res.status(404).json({ message: "Event not found" });
        }

        findVenue.events.splice(findEventRemoveIndex, 1);
        await findVenue.save();

        return res.status(200).json({ message: "Event removed successfully", removedEventId: itemId });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = venueRemoveEvent;
