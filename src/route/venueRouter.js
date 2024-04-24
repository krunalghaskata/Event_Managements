const express = require('express')
const Controller = require('../controller/index')
const { checkAuth } = require('../middleware/checkAuth')

const Routers = express.Router()


Routers.post('/addvenue', checkAuth, Controller.addVenue)

Routers.get('/getVenue', checkAuth, Controller.getVenue)

Routers.post('/addEventVenue/:id', checkAuth, Controller.VenueAddEvent)

Routers.patch('/updateVenue/:id', checkAuth, Controller.updatevenue)

Routers.delete('/deleteVenue/:id', checkAuth, Controller.deleteVenue)

Routers.delete('/eventRemoveVenue/:id', checkAuth, Controller.venueRemoveEvent)






exports.Routers = Routers