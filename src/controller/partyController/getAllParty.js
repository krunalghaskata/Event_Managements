const Party = require('../../model/partyModel')



const getAllParty = async (req, res) => {
    try {

        // const allPartyfind = await Party.find({})
        const allPartyfind = await Party.aggregate([{
            $unwind: "$organizer"
        },])

        return res.status(200).json({ allPartyfind })

    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

module.exports = getAllParty