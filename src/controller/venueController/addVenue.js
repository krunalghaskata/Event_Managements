const Venue = require('../../model/venueModel');
const User = require('../../model/userModel');

const addVenue = async (req, res) => {
    try {
        const { name, address, capacity, contactPerson } = req.body;

        const userId = req.user.id;

        if (!userId) {
            return res.status(404).json({ message: "User not found" });
        }

        const userInstance = await User.findById(userId);

        if (!userInstance) {
            return res.status(404).json({ message: "User not found" });
        }

        if (userInstance.role !== 'organizer') {
            return res.status(403).json({ message: "Access Denied. Only organizers can determine a venue" });
        }

        if (!(name && address && capacity && contactPerson)) {
            return res.status(400).json({ message: "Please provide all required input" });
        }

        const venue = new Venue({
            name,
            address,
            capacity,
            contactPerson
        });

        await venue.save();

        return res.status(200).json({ message: "Add venue success", venue });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

module.exports = addVenue; 