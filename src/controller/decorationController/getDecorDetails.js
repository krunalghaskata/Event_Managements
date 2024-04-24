const Decor = require("../../model/decorationModel")



const DecorDetails = async (req, res) => {
    try {

        const User = req.user.id
        const DecorId = req.params.id

        const DecorDetailsFind = await Decor.findById({ _id: DecorId, organizer: User }).populate({ path: "organizer" })

        if (!DecorDetailsFind) {
            return res.status(404).json({ message: "Decoration Details not found" })
        }

        return res.status(200).json({ message: "decoratin details find", DecorDetailsFind })
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}


module.exports = DecorDetails