const express = require('express')
const Controller = require('../controller/index')
const { checkAuth } = require('../middleware/checkAuth')


const Routers = express.Router()



Routers.post('/addBookingDecoration', checkAuth, Controller.BookingDecoration)

Routers.patch('/updateBookDecor/:id', checkAuth, Controller.UpdateBookingDecor)

Routers.delete('/deleteBookDecor/:id', checkAuth, Controller.deleteBookingDecor)

Routers.post('/orderDecoration/:id', checkAuth, Controller.OrderDecoration)

Routers.get('/getOrderDecor', checkAuth, Controller.getOrderDecor)

Routers.get('/getBookingDecorDetails/:id', checkAuth, Controller.getBookingDecorDetails)




exports.Routers = Routers