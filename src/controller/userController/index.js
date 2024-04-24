const signup = require('./signup')
const login = require('./login')
const updateUser = require('./userUpdate')
const userDelete = require('./userDelete')
const userGet = require('./userGet')
const logOut = require('./logOut')

module.exports = {
    signup,
    login,
    updateUser,
    userDelete,
    userGet,
    logOut
}