const Party = require('../../model/partyModel');
const User = require('../../model/userModel');
const Event = require('../../model/eventModel')

const createParty = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log(userId);
        const { name, title, location, date, startTime, endTime, eventId } = req.body;

        if (!(name && title && location && date && startTime && endTime)) {
            return res.status(404).json({ message: "please require input" });
        }

        const userInstance = await User.findById(userId);
        console.log(userInstance);

        if (!userInstance || userInstance.role !== "organizer") {
            return res.status(401).json({ message: "You are not authorized to create a party." });
        }



        const newParty = new Party({
            name,
            title,
            location,
            date,
            startTime,
            endTime,
            organizer: userId,
            event: eventId,
        });

        console.log(newParty);
        const saveParty = await newParty.save();

        return res.status(200).json({ message: "party create successfully", saveParty });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = createParty;
