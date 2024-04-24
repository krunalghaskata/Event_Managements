const Party = require('../../model/partyModel');
const User = require('../../model/userModel');

const removeAttendeesParty = async (req, res) => {
    try {

        const { email } = req.body;
        const PartyId = req.params.id;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const party = await Party.findById(PartyId);

        if (!party) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (!(party.attendees.includes(user._id))) {
            return res.status(400).json({ message: "already invited User removed" });
        }

        party.attendees.pop(user._id);

        await party.save();

        return res.status(200).json({ message: "remove Invite user successfully", party });


    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = removeAttendeesParty;
