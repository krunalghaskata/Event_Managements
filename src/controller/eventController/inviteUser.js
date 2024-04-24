const Event = require('../../model/eventModel');
const User = require('../../model/userModel');

const inviteUser = async (req, res) => {
    try {
        const { email } = req.body;
        const eventId = req.params.id;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (event.attendees.includes(user._id)) {
            return res.status(400).json({ message: "User already invited to this event" });
        }

        if (event.attendees.length >= 100) {
            return res.status(400).json({ message: "Maximum number of attendees reached" });
        }

        event.attendees.push(user._id);

        await event.save();

        return res.status(200).json({ message: "Invited user successfully" });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = inviteUser;
