const User = require('../../model/userModel')
const ErrorHandler = require('../../middleware/errorHandling')

const userDelete = async (req, res, next) => {
    try {
        const userId = req.user.id
        const { email } = req.body

        const userInstance = await User.findOne({ email })

        if (!userInstance) {
            return res.status(404).json({ message: "User not found" })
            // return next(new ErrorHandler("User not found", 404, res));


        }

        if (userInstance.id !== userId) {
            return res.status(403).json({ message: "Unauthorized: You can only delete your own account" })
        }

        await User.findOneAndDelete({ email })

        return res.status(200).json({ message: "User deleted successfully" })
       
    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal Server Error" })
    }
}

module.exports = userDelete
