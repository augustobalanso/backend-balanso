import express from "express"
import logger from "morgan"
import dotenv from "dotenv"
import bcrypt from 'bcrypt'
import { Server as HttpServer } from 'http'
import { Server as IoServer } from 'socket.io'
import MongoStore from "connect-mongo";
import indexRouter from './src/routes/index.js'
import session from "express-session"
import cookieParser from "cookie-parser"
import passport from "passport"
import passportLocal from "passport-local"
import mongooseUserConnection from "./src/services/mongo/config/users.config.js"
import UserSchema from "./src/services/mongo/models/user.models.js"
import { v4 as uuid } from "uuid"

dotenv.config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use(express.static('views'))

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
        ttl: 1 * 60 * 60
    }),
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: false,
        secure: false
    }
}))

app.set('view engine', 'ejs');
app.set('views', './views');

// PASSPORT SETUP

const LocalStrategy = passportLocal.Strategy
const MongoUserModel = mongooseUserConnection.model('users', UserSchema)

app.use(passport.initialize());
app.use(passport.session());

passport.use('signin', new LocalStrategy(async (username, password, done) => {
    const mongoFetch = await MongoUserModel.findOne({username: username})

    if(!mongoFetch){
        return done(null, false)
    }

    const boolPassword = await bcrypt.compare(password,mongoFetch.password)
    if(!boolPassword){
        return done(null, false)
    }

    done(null, mongoFetch)
} ))

passport.use('signup', new LocalStrategy({
        passReqToCallback: true 
    }, async (req, username, password, done) => {

    const userExists = await MongoUserModel.findOne({ username: req.body.username })
    if(userExists){
        return done(null, false)
    }

    const newUserFormatted = {
        _id: uuid(),
        email: req.body.email,
        nombre: req.body.nombre,
        apellido: req.body.apellido, 
        edad: req.body.edad,
        username: req.body.username,
        avatar: req.body.avatar,
        password: await bcrypt.hash(req.body.password, 8)
    }

    const createUserResponse = await MongoUserModel.create(newUserFormatted)
    done(null, createUserResponse)
} ))

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    const userData = await MongoUserModel.findById(id);
    done(null, userData);
});


app.use('/', indexRouter)

// -------------------------

const http = new HttpServer(app)
const io = new IoServer(http)

export { http, io, __dirname }