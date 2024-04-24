
const User = require('../../model/userModel')
const { generateHash } = require('../../utils/auth')
const sendMail = require('../../utils/mailer')

const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!(name && email && password && role)) {
            return res.status(400).json({ message: "Please provide all required inputs." });
        }

        const userInstance = await User.findOne({ email });

        if (userInstance) {
            return res.status(409).json({ message: "User already exists. Please login." });
        }

        const hash = await generateHash(password);

        const user = new User({
            name,
            email,
            password: hash,
            role,
        });

        
        sendMail(email, name).catch(error => {
            console.error("Failed to send email:", error);
        });

        await user.save();

        return res.status(201).json({ message: "User signup successful", user });
    } catch (error) {
        return res.status(500).json({message:error  });
    }
};

module.exports = signup


