const User = require('../../model/userModel')
const { generateHash } = require('../../utils/auth')


const userUpdate = async (req, res) => {
    try {

        const userId = req.user.id;
        let { password } = req.body;
        const userToUpdate = await User.findById(userId);

        if (!userToUpdate) {
            return res.status(404).json({ message: "user not found" });
        }

        if (password) {
            password = await generateHash(password);
        }

        await User.findOneAndUpdate(userToUpdate, { ...req.body, password }, { new: true });

        return res.status(200).json({ message: "user updated" });
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}


module.exports = userUpdate