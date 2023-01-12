import express from "express"
import logger from "morgan"
import dotenv from "dotenv"
import { Server as HttpServer } from 'http'
import { Server as IoServer } from 'socket.io'
import MongoStore from "connect-mongo";
import indexRouter from './src/routes/index.js'
import session from "express-session"
import cookieParser from "cookie-parser"

dotenv.config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended : true }))

// FIX __DIRNAME IN ES MODULES
import path from 'path'
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// ---------------

app.use(logger('dev'))

// Cookies CFG

const COOKIE_SECRET = process.env.COOKIE_SECRET

app.use(cookieParser(COOKIE_SECRET))

app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_USERS_URI,
        dbName: 'desafio11',
        collectionName: 'sessions',
        ttl: 0 * 1 * 60 * 60
    }),
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: false,
        secure: false
    }
}))

// -------------------------

app.use('/', indexRouter)

const http = new HttpServer(app)
const io = new IoServer(http)

export { http, io, __dirname }