const Event = require('../../model/eventModel');
const User = require('../../model/userModel')

const deleteEvent = async (req, res) => {
    try {


        const user = req.user.id;
        const eventId = req.params.id;


        const userInstance = await User.findById(user)

        if (userInstance.role !== "organizer") {
            return res.status(404).json({ message: "access denied  only organizer deleted events" })
        }

        const event = await Event.findOne({ _id: eventId, createdBy: user });

        if (!event) {
            return res.status(404).json({ message: "Event not found or unauthorized to delete" });
        }

        await Event.findByIdAndDelete(eventId);

        return res.status(200).json({ message: "Event deleted successfully" });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = deleteEvent;
