const User = require('../../model/userModel')
const Event = require('../../model/eventModel')

const removeInviteUser = async (req, res) => {
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

        if (!(event.attendees.includes(user._id))) {
            return res.status(400).json({ message: "already invited User removed" });
        }

        event.attendees.pop(user._id);

        await event.save();

        return res.status(200).json({ message: "remove Invite user successfully" });



    } catch (error) {
        return res.status(500).json({ message: error })
    }
}


module.exports = removeInviteUser