import express from "express"
import logger from "morgan"
import dotenv from "dotenv"
import { Server as HttpServer } from 'http'
import { Server as IoServer } from 'socket.io'
import indexRouter from './src/routes/index.js'
import session from "express-session"
import cookieParser from "cookie-parser"

dotenv.config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use(express.static('public'))

app.use(logger('dev'))

// Cookies CFG

const COOKIE_SECRET = process.env.COOKIE_SECRET

app.use(cookieParser(COOKIE_SECRET))

app.use(session({
    secret: COOKIE_SECRET,
    resave: true,
    saveUninitialized: true
}))

// -------------------------

app.get('/', (_req,res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/health', (_req, res) => {
    res.status(200).json({
        success: true,
        health: 'up',
        environment: process.env.ENVIRONMENT
    })
})

app.use('/api', indexRouter)




const http = new HttpServer(app)
const io = new IoServer(http)

export { http, io }