const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config')
const { verifyToken } = require('../utils/auth');




exports.checkAuth = async (req, res, next) => {

    try {

        let token = req.headers.authorization;
        if (!token) {
            return res.status(404).json({ message: "REQUIRE_TOKEN" })
        }

        token = token.slice(7);
        const decoded = await verifyToken(token, CONFIG.TOKEN.SIGN)

        const userId = decoded;
        req.user = userId;

        next();

    } catch (error) {
        if (error.message === "jwt expired") {
            return res.status(500).json({ message: 'token Expired' })
        }
        res.status(500).send(error)
    }
}
