const CONFIG = require('../config/config')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')


const generateHash = async (password) => {
    const hash = await bcrypt.hash(password, 10);
    return hash;
};

const compareHash = async (password, hash) => {
    const comparePassword = await bcrypt.compare(password, hash);
    return comparePassword;
};

const genetareToken = async (payload) => {
    const token = await JWT.sign(payload, CONFIG.TOKEN.SIGN, {
        expiresIn: CONFIG.TOKEN.EXPIRES
    })
    return token;
}

const refreshToken = async (payload) => {
    const token = await JWT.sign(payload, CONFIG.TOKEN.SIGN, {
        expiresIn: CONFIG.TOKEN.REFRESH_EXPIRES
    })
    return token;
}

const verifyToken = async (token) => {
    const decoded = await JWT.verify(token, CONFIG.TOKEN.SIGN)
    return decoded
}



module.exports = {
    generateHash,
    compareHash,
    genetareToken,
    verifyToken,
    refreshToken
}

