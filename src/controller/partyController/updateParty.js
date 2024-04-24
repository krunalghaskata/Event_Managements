const Party = require('../../model/partyModel')
const User = require('../../model/userModel')



const updateParty = async (req, res) => {
    try {

        const partyId = req.params.id;
        const user = req.user.id

        const userInstance = await User.findById(user)

        if (userInstance.role !== "organizer") {
            return res.status(401).json({ message: "access denied only organizer  updated  Party " })
        }


        const Partys = await Party.findByIdAndUpdate({ _id: partyId, organizer: user }, { ...req.body }, { new: true })

        if (!Partys) {
            return res.status(404).json({ message: "id not match " })
        }

        await Partys.save()

        return res.status(200).json({ message: "party updated successfully", Partys })

    } catch (error) {
        return res.status(500).json({ message: error })
    }
}


module.exports = updateParty