const express = require('express')
const Controller = require('../controller/index')
const { checkAuth } = require('../middleware/checkAuth')


const Routers = express.Router()



Routers.post('/eventbooking', checkAuth, Controller.eventBooking)

Routers.get('/getBooking', checkAuth, Controller.getBooking)

Routers.get('/getAllBooking', Controller.getAllBooking)

Routers.delete('/bookingDelete/:id', checkAuth, Controller.bookingDelete)

Routers.get('/eventBookingDetails/:id', checkAuth, Controller.eventBookingDetails)





exports.Routers = Routers