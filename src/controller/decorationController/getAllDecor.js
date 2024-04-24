const Decor = require('../../model/decorationModel')

const getAllDecor = async (req, res) => {
    try {
        // const allEventFind = await Event.find()
        const allgetDecor = await Decor.aggregate([{
            $unwind: "$organizer"
        },])

        return res.status(200).json({ allgetDecor })


    } catch (error) {
        return res.status(500).json({ message: error })
    }
}


module.exports = getAllDecor