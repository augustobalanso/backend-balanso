import { Router } from "express";
import productosRouter from './productos.router.js'
import { __dirname } from "../../app.js";
import md5 from "md5";
import mongooseUserConnection from "../services/mongo/config/users.config.js";
import UserSchema from "../services/mongo/models/user.models.js";
import { v4 as uuid } from "uuid";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router()

const mongoUserModel = mongooseUserConnection.model('users', UserSchema)

router.use('/productos-test', productosRouter)

router.get('/', (req, res) => {
    res.redirect('/home')
})

router.get('/home', authMiddleware, async (req, res) => {
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
        password = md5(password)

        const successLogin = await mongoUserModel.findOne({alias, password})
        if(!successLogin){
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
            password: md5(req.body.password)
        }

        await mongoUserModel.create(newUserFormatted)
        res.redirect('/login')
})

export default router