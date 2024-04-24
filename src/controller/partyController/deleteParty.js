const Party = require('../../model/partyModel');
const User = require('../../model/userModel');

const DeleteParty = async (req, res) => {
    try {
        const user = req.user.id;
        const PartyId = req.params.id;

        const userInstance = await User.findById(user);

        if (userInstance.role !== 'organizer') {
            return res.status(403).json({ message: 'Access denied. Only organizers can delete parties.' });
        }

        const PartyDelete = await Party.findOne({ _id: PartyId, organizer: user });

        if (!PartyDelete) {
            return res.status(404).json({ message: 'Party not found' });
        }

        await Party.findByIdAndDelete(PartyId);

        return res.status(200).json({ message: 'Party deleted successfully', PartyDelete });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = DeleteParty;
