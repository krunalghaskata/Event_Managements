const express = require('express')
const Controller = require('../controller/index')
const { checkAuth } = require('../middleware/checkAuth')
const controller = require('../controller/index')

const Routers = express.Router()



Routers.post('/createEvent', checkAuth, Controller.createEvent)

Routers.patch('/eventUpdate/:id', checkAuth, Controller.eventUpdate)

Routers.delete('/deleteEvent/:id', checkAuth, controller.deleteEvent)

Routers.get('/organizerDetails/:id', checkAuth, Controller.organizerDetailsFind)

Routers.get('/eventGet/:id', checkAuth, Controller.eventGet)

Routers.get('/allEventFind', Controller.allEventfind)

Routers.post('/inviteUser/:id', Controller.inviteUser)

Routers.get('/filtering/:key', checkAuth, controller.filtering)

Routers.get('/attendieesDetails', checkAuth, Controller.attendeesDetails)

Routers.get('/dateFiltering', checkAuth, Controller.dateFilter)

Routers.delete('/removeInviteUser/:id', checkAuth, Controller.removeInviteUser)





exports.Routers = Routers