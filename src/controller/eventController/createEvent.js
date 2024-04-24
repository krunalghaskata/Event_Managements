const Event = require('../../model/eventModel')



const createEvent = async (req, res) => {
    try {
        const { name, title, description, startDate, endDate, package } = req.body;
        const user = req.user

        if (!(name && title && description && startDate && endDate && package)) {
            return res.status(404).json({ message: "require inpute" })
        }

        if (user.role !== "organizer") {
            return res.status(404).json({ message: "you are not create event only organizer create event " })
        }

        const eventCreate = new Event({
            name,
            title,
            description,
            package,
            startDate,
            endDate,
            role: user.role,
            createdBy: user.id,
        })
        await eventCreate.save()
        return res.status(200).json({ message: "event created ", eventCreate })
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

module.exports = createEvent