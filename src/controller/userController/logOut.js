const User = require('../../model/userModel')

const logOut = async (req, res) => {
    try {
        const user = await User.findOne({ Token: req.body.token })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        user.token = null
        await user.save()
        return res.status(200).json({ message: "user logOut successfully ", user })

    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

module.exports = logOut