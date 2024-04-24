const User = require('../../model/userModel')

const { compareHash, genetareToken, refreshToken } = require('../../utils/auth')

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!(email && password)) {
            return res.status(404).json({ message: "require input" })
        }
        const userInstance = await User.findOne({ email })
        if (!userInstance) {
            return res.status(404).json({ message: "signup first after login" })
        }


        const comparePassword = await compareHash(password, userInstance.password)
        if (!comparePassword) {
            return res.status(404).json({ message: "invalid password" })
        }


        const token = await genetareToken({ id: userInstance.id, role: userInstance.role })

        const refrshtoken = await refreshToken({ id: userInstance.id, role: userInstance.role })
        userInstance.token = token

        res.cookie("set-cookie", token, {
            expires: new Date(Date.now() + 7200000),
            httpOnly: true
        })

        await userInstance.save()

        return res.status(200).json({ message: "login success", token, refrshtoken })

    } catch (error) {
        return res.status(505).json({ message: error })
    }
}

module.exports = login
