const Party = require('../../model/partyModel')
const User = require('../../model/userModel')



const attendeesAddParty = async (req, res) => {
    try {
        const { email } = req.body
        const PartyId = req.params.id
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }

        const party = await Party.findById(PartyId)

        if (!party) {
            return res.status(404).json({ message: "party not found" })
        }

        if (party.attendees.includes(user._id)) {
            return res.status(400).json({ message: "User already invited to this party " })
        }
        if (party.attendees.length >= 5) {
            return res.status(400).json({ message: "Maximum number of attendees reached" });
        }

        party.attendees.push(user.id)
        await party.save()
        return res.status(200).json({ message: "user inveted successfully to this party", party })

    } catch (error) {
        return res.status(500).json({ message: error })
    }
}


module.exports = attendeesAddParty