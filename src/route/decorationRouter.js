const express = require('express')
const Controller = require('../controller/index')
const { checkAuth } = require('../middleware/checkAuth')


const Routers = express.Router()


Routers.post('/createDecoration', checkAuth, Controller.DecorationMenu)

Routers.patch('/updateDecoration/:id', checkAuth, Controller.updateDecoration)

Routers.delete('/deleteDecoration/:id', checkAuth, Controller.deleteDecoration)

Routers.get('/getDecor/:id', checkAuth, Controller.getDecor)

Routers.get('/allgetDecor', Controller.getallDecor)

Routers.get('/DecorDetails/:id', checkAuth, Controller.DecorDetails)


exports.Routers = Routers