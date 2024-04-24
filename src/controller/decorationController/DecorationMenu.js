 

const Decoration = require('../../model/decorationModel');
const User = require('../../model/userModel');

const createDecoration = async (req, res) => {
    try {
        const { name, description, price, quantity, createdAt, category } = req.body;
        const user = req.user;

        if (user.role !== "organizer") {
            return res.status(404).json({ message: "You are not allowed to create an event. Only organizers can create events." });
        }

        const currentDecorationsCount = await Decoration.countDocuments({ organizer: user.id });

        if (currentDecorationsCount >= 5) {
            return res.status(400).json({ message: "You can only create up to 5 decorations." });
        }

        const eventCreate = new Decoration({
            name,
            description,
            price,
            quantity,
            createdAt,
            category,
            organizer: user.id,
        });

        await eventCreate.save();
        return res.status(200).json({ message: "Event created", eventCreate });
    } catch (error) {
       
     return  res.status(500).send(error);
    }
};

module.exports = createDecoration;
