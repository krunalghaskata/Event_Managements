require("dotenv").config()

const config = {
    PORT: process.env.PORT,
    DB: process.env.DB,
    TOKEN: {
        SIGN: process.env.TOKEN_SIGN,
        EXPIRES: process.env.TOKEN_EXPIRES,
        REFRESH_EXPIRES: process.env.REFRESH_TOKEN_EXPIRES
    }
}


module.exports = config