const Party = require('../../model/partyModel');

const getParty = async (req, res) => {
    try {
        const userId = req.user.id

        const getEventParty = await Party.findOne({ userId })

        if (!getEventParty) {
            return res.status(404).json({ message: "user  not get Event Party" })
        }

        return res.status(200).json({ message: "event Party get successfully", getEventParty })

    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

module.exports = getParty;
