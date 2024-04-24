const Event = require('../../model/eventModel')
const User = require('../../model/userModel')



const attendeesDetails = async (req, res) => {
    try {

        const { Eventid } = req.body

        const user = req.user.id

        if (!Eventid) {
            return res.status(404).json({ message: "id not found" })
        }

        const attendieesFind = await Event.findById({ _id: Eventid, createdBy: user }).populate("attendees")
        if (!attendieesFind) {
            return res.status(404).json({ message: "FORBIDDEN" })
        }



        return res.status(200).json({ message: attendieesFind })

    } catch (error) {
        return res.status(500).json({ message: error })
    }
}


module.exports = attendeesDetails       