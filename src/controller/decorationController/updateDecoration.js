const Decoration = require('../../model/decorationModel');
const User = require('../../model/userModel');

const updateDecoration = async (req, res) => {
    try {
        const userId = req.user.id;
        const decorId = req.params.id;

        const userInstance = await User.findById(userId);
        if (!userInstance || userInstance.role !== "organizer") {
            return res.status(403).json({ message: "Access denied. Only organizers can update decoration." });
        }

        const update = await Decoration.findOneAndUpdate(
            { _id: decorId, organizer: userId }, 
            { ...req.body }, 
            { new: true }
        );

        if (!update) {
            return res.status(404).json({ message: "Decoration not found or you don't have permission to update it." });
        }

        return res.status(200).json({ message: "Updated decoration", update });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = updateDecoration;
