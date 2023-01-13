import { Router } from "express";
import productosRouter from './productos.router.js'
import { __dirname } from "../../app.js";
import bcrypt from 'bcrypt'
import md5 from "md5";
import mongooseUserConnection from "../services/mongo/config/users.config.js";
import UserSchema from "../services/mongo/models/user.models.js";
import { v4 as uuid } from "uuid";
import authMiddleware from "../middlewares/authMiddleware.js";
import { mongo } from "mongoose";

const router = Router()

const mongoUserModel = mongooseUserConnection.model('users', UserSchema)

router.use('/productos-test', productosRouter)

router.get('/', (req, res) => {
    res.redirect('/home')
})

router.get('/home', authMiddleware, async (req, res) => {
    res.cookie('isAuth',true,{maxAge: 10 * 60 * 1000})
    res.cookie('username',req.session.username,{maxAge: 10 * 60 * 1000})
    res.render('index')
})

router.get('/login', async (req, res) => {
    if(req.session.isAuth){
        return res.render('home')
    }
    res.render('login')
})
    .post('/login', async (req, res) => {
        let { alias, password } = req.body

        const mongoFetch = await mongoUserModel.findOne({alias: alias})
        console.log(mongoFetch.password)

        if(!mongoFetch){
            return res.redirect('/error')
        }

        const boolPassword = await bcrypt.compare(password,mongoFetch.password)
        if(!boolPassword){
            return res.redirect('/error')
        }

        req.session.username = alias
        req.session.isAuth = true

        res.redirect('/home')
})


router.get('/signup', (req, res) => {
    if(req.session.isAuth){
        return res.redirect('/home')
    }
    res.render('signup')
})
    .post('/signup', async (req, res) => {
        const userExists = await mongoUserModel.findOne({ alias: req.body.alias})
        if(userExists){
            return res.status(409).json({
                success: false,
                message: 'user already exists'
            })
        }

        const newUserFormatted = {
            _id: uuid(),
            email: req.body.email,
            nombre: req.body.nombre,
            apellido: req.body.apellido, 
            edad: req.body.edad,
            alias: req.body.alias,
            avatar: req.body.avatar,
            password: await bcrypt.hash(req.body.password, 8)
        }

        await mongoUserModel.create(newUserFormatted)
        res.redirect('/login')
})

router.get('/signout', (req, res) => {
    res.clearCookie('isAuth')
    res.clearCookie('username')
    req.session.destroy((err) => {
        res.redirect('/login')
    })
})

router.get('/error', (_req, res) => {
    res.render('error')
})

export default router