const express = require('express')
const Controller = require('../controller/index')
const { checkAuth } = require('../middleware/checkAuth')


const Routers = express.Router()


Routers.post('/createParty', checkAuth, Controller.createParty)

Routers.get('/getParty', checkAuth, Controller.getParty)

Routers.get("/getAllParty", Controller.getAllParty)

Routers.post('/userInviteParty/:id', Controller.attendeesAddParty)

Routers.patch('/updateParty/:id', checkAuth, Controller.PartyUpdate)

Routers.delete('/deleteParty/:id', checkAuth, Controller.PartyDelete)

Routers.delete('/removeAttendeesParty/:id', checkAuth, Controller.removeAttendeesParty)




exports.Routers = Routers