const express = require('express')
const mongoose = require('mongoose')
const CONFIG = require('./src/config/config')
const session = require('express-session')
const bodyParser = require('body-parser')
const server = express()
const path = require('path')
const event = require('events')
const crypto = require('crypto')
const User = require('./src/model/userModel')

server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.set('view engine', "ejs")
server.set('views', path.join(__dirname, 'views'));


server.use(session({
    secret: "my secret key",
    saveUninitialized: true,
    resave: false
}))

server.get('/', (req, res) => {
    res.render('index', {
        title: " this is index page",
        text: "this is home page"
    })
})

// server.get("/users", async (req, res) => {
//     const users = await User.find({})
//     res.render("index", {
//         title: "this is home page",
//         users: users
//     })
// })


const UserRouter = require('./src/route/userRouter')
const eventRouter = require('./src/route/eventRouter')
const bookingRouter = require('./src/route/bookingRouter')
const venueRouter = require('./src/route/venueRouter')
const partyRouter = require('./src/route/partyRoute')
const DecorationRouter = require('./src/route/decorationRouter')
const BookDecorRouter = require('./src/route/BookingDecorRouter')


mongoose
    .connect(CONFIG.DB)
    .then(() => {
        console.log("database connected ");
    })
    .catch((error) => {
        console.log("database not connected", error);
    })


//crypto

// const secret = 'krunal'
//  const hash = crypto.createHmac('sha256',secret).update("prajapati").digest("hex")
//  console.log(hash);



//event emitter

// const eventEmitter = new event.EventEmitter()

// eventEmitter.on('hello', function(name){
//     console.log(name,"hello dear");
// })
// eventEmitter.emit("hello","jonas")


server.use('/users/', UserRouter.Routers)
server.use('/events/', eventRouter.Routers)
server.use('/booking/', bookingRouter.Routers)
server.use('/venue/', venueRouter.Routers)
server.use('/party/', partyRouter.Routers)
server.use('/decoration/', DecorationRouter.Routers)
server.use('/BookDecor/' , BookDecorRouter.Routers)
 



server.listen(CONFIG.PORT, () => {
    console.log(` server start on  http://localhost:${CONFIG.PORT}`);
})




















































// const express = require('express')
// const mongoose = require('mongoose')
// const CONFIG = require('./src/config/config')
// const session = require('express-session')
// const bodyParser = require('body-parser')
// const User = require('./src/model/userModel')
// const path = require('path')
// // const helmet = require('helmet')
// // const swaggerDoc = require("swagger-jsdoc");
// // const swaggerUi = require('swagger-ui-express')



// //swegger api option


// // const option = {
// //     definition: {
// //         openapi: "3.0.0",
// //         info: {
// //             title: "book management application",
// //             description: "node expressjs book management project"
// //         },
// //         servers: [{
// //             url: "http://localhost:2000"
// //         }]
// //     },
// //     apis: ['./src/route/*.js']
// // }

// // const spec = swaggerDoc(option)


// const server = express()

// server.use(express.json());
// server.use(bodyParser.urlencoded({ extended: true }));


// server.use(session({
//     secret: "my secret key",
//     saveUninitialized: true,
//     resave: false
// }))




// server.set('view engine', "ejs")
// server.set('views', path.join(__dirname, 'views'));

// server.use((req, res, next) => {
//     res.locals.message = req.session.message
//     delete req.session.message
//     next();
// })




// server.get("/", (req, res) => {
//     res.render("./src/views/layout/index.ejs", { title: "home page" })
// })





// const UserRouter = require('./src/route/userRouter')
// const eventRouter = require('./src/route/eventRouter')
// const bookingRouter = require('./src/route/bookingRouter')
// const venueRouter = require('./src/route/venueRouter')
// const partyRouter = require('./src/route/partyRoute')


// mongoose
//     .connect(CONFIG.DB)
//     .then(() => {
//         console.log("database connected ");
//     })
//     .catch((error) => {
//         console.log("database not connected", error);
//     })




// // server.use(helmet())
// server.use('/users/', UserRouter.Routers)
// server.use('/events/', eventRouter.Routers)
// server.use('/booking/', bookingRouter.Routers)
// server.use('/venue/', venueRouter.Routers)
// server.use('/party/', partyRouter.Routers)

 
// // server.use('/api-doc', swaggerUi.serve, swaggerUi.setup(spec))



// server.listen(CONFIG.PORT, () => {
//     console.log(` server start on  http://localhost:${CONFIG.PORT}`);
// })