import { Server } from 'socket.io'
import express from 'express'
import __dirname from './utils.js'
import './dao/dbConfig.js'
import config from './config/config.js'
import session from 'express-session'
import chatRouter from './routes/web/chat.router.js'
import productsRouter from './routes/api/products.router.js'
import cartsRouter from './routes/api/carts.router.js'
import viewsRouter from './routes/web/views.router.js'
import sessionsRouter from './routes/api/sessions.router.js'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'
// import Chats from './dao/dbManagers/chat.js'
import messageModel from './dao/models/messageModel.js'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import initializePassport from './config/passport.config.js'
import cookieParser from 'cookie-parser'

// const chatManager = new Chats()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/public`))

app.use(cookieParser());

app.use(session({
    store: MongoStore.create({
        mongoUrl: config.mongoUrl,
        mongoOptions: { useNewUrlParser: true },
        ttl: 3600
    }),
    secret: 'secretCoder',
    resave: true,
    saveUninitialized: true
}));

//config passport
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

//config de nuestras vistas
app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

// app.use('/chat', chatRouter)
app.use('/', viewsRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/api/auth', sessionsRouter)

app.listen(Number(config.port), () => console.log(`Server running on port ${config.port}`))

// const io = new Server(server)

// const messages = await chatManager.getMessages()

// io.on('connection', socket => {
//     socket.on('message', async data => {
//         // messages.push(data)
//             await messageModel.create(data)
//             try {
//             await chatManager.addMessage(data)
//             const messages = await chatManager.getMessages().toObject()
//             console.log(messages)
//             io.emit('messageLogs', messages)
//             } catch (error) {
//                 console.log(error)
//             }
            
//     })
// })