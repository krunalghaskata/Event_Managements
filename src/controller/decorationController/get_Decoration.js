const Decor = require('../../model/decorationModel')

const getDecor = async (req, res) => {
    try {

        const DecorId = req.params.id

        const user = req.user.id

        const getDecor = await Decor.findById({ _id: DecorId, organizer: user })

        if (!getDecor) {
            return res.status(404).json({ message: "decoration  not get" })
        }

        return res.status(200).json({ message: "decoration get", getDecor })


    } catch (error) {
        return res.status(505).json({ message: error })
    }
}


module.exports = getDecor