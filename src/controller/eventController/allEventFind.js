const Event = require('../../model/eventModel')



const allEventFind = async (req, res) => {
    try {

        // const allEventFind = await Event.find()
        const allEventFind = await Event.aggregate([{
            $unwind: "$createdBy"
        },])

        return res.status(200).json({ allEventFind })
 
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}


module.exports = allEventFind