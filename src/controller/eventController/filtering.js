const Event = require('../../model/eventModel');

const filtering = async (req, res) => {
    try {
        const key = req.params.key;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;


        const EventSearch = await Event.find({
            $or: [
                { name: { $regex: key, $options: "i" } },
                { title: { $regex: key, $options: "i" } }
            ],

        })
            .skip(skip)
            .limit(limit);

        if (EventSearch.length === 0) {
            return res.status(404).json({ message: "Event not found" });
        }

        return res.status(200).json({ EventSearch });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const dateFilter = async (req, res) => {
    try {
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        const dateFilter = {};

        if (startDate && endDate) {
            dateFilter.$gte = new Date(startDate);
            dateFilter.$lte = new Date(endDate);
        }


        const dateQuery = {
            dateField: dateFilter,
        };


        const result = await Event.find(dateQuery);

        return res.status(200).json({ message: "Date Filter", result });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    filtering,
    dateFilter
};
