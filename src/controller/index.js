const userController = require('../controller/userController/index')
const eventController = require('../controller/eventController/index')
const bookingController = require('./bookingController/index')
const venueController = require('../controller/venueController/index')
const partyController = require('../controller/partyController/index')
const DecorationController = require('../controller/decorationController/index')
const BookingDecorationcontroller = require('../controller/BookingDecoration/index')

const controller = {
    ...userController,
    ...eventController,
    ...bookingController,
    ...venueController,
    ...partyController,
    ...DecorationController,
    ...BookingDecorationcontroller
}
module.exports = controller