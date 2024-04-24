const Decoration = require('../../model/decorationModel')
const User = require('../../model/userModel')



const deleteDecoration = async (req, res) => {
    try {
        const decorId = req.params.id;
        const user = req.user.id

        const userInstance = await User.findById(user);
        if (!userInstance || userInstance.role !== "organizer") {
            return res.status(403).json({ message: "Access denied. Only organizers can delete decoration." });
        }


        const decoration = await Decoration.findOne({ _id: decorId, organizer: user });

        if (!decoration) {
            return res.status(404).json({ message: "Event not found or unauthorized to delete" });
        }

        await Decoration.findByIdAndDelete(decorId);

        return res.status(200).json({ message: "Event deleted successfully", decoration });


    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

module.exports = deleteDecoration