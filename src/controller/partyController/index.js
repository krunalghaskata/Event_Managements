const createParty = require('./createParty')
const getParty = require('./getParty')
const attendeesAddParty = require('./attendeesParty')
const getAllParty = require('./getAllParty')
const PartyUpdate = require('./updateParty')
const PartyDelete = require('./deleteParty')
const removeAttendeesParty = require('./removeAttendeesParty')



module.exports = {
    createParty,
    getParty,
    attendeesAddParty,
    getAllParty,
    PartyUpdate,
    PartyDelete,
    removeAttendeesParty
}