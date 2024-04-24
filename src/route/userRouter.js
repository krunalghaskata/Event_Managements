const express = require('express')
const Controller = require('../controller/index')
const { checkAuth } = require('../middleware/checkAuth')

const Routers = express.Router()

// /**
//  * @swagger
//  *  components:
//  *   Schemas:
//  *    User:
//  *      type:object
//  *      required:
//  *        -name
//  *        -email
//  *        -password
//  *        -role
//  *       properties:
//  *          id:
//  *            type: string
//  *            description: the auto-generated id of user collection
//  *          name:
//  *            type: string
//  *            description: name 
//  *          email:
//  *             type: string
//  *             description: email
//  *          password:
//  *             type: string
//  *             description: password
//  *          role:
//  *             type: string
//  *             description: role
//  *        example:
//     *             -id:483623j23g5u35
//     *             -name:john
//     *             -email:john2gmail.com
//     *             -password:13213
//     *             -role:organizer
//  */

Routers.post('/signup', Controller.signup)

Routers.post('/login', Controller.login)

Routers.post('/logOut', Controller.logOut)

Routers.patch('/updatedUser', checkAuth, Controller.updateUser)

Routers.delete('/userDelete', checkAuth, Controller.userDelete)

Routers.get('/userGet', checkAuth, Controller.userGet)
// Routers.get('/userGet', Controller.userGet)// ejs template 




exports.Routers = Routers