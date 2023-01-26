import { Router } from "express";
import productosRouter from './productos.router.js'
import { __dirname } from "../../app.js";
import passport from "passport";

const router = Router()


router.use('/productos-test', productosRouter)

router.get('/', (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/home')
    }
    res.redirect('/login')
})

router.get('/home', async (req, res) => {
    if(req.isAuthenticated()){
        res.cookie('username',req.user.username,{maxAge: 10 * 60 * 1000})
        return res.render('index',{ username : req.user.username})
    }
    res.redirect('/login')
})

router.get('/login', async (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/home')
    }
    res.render('login')
})
    .post('/login', passport.authenticate('signin', {failureRedirect: '/error', failureMessage: 'Not authorized to login'}), async (_req, res) => {
        res.redirect('/home')
})


router.get('/signup', (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/home')
    }
    res.render('signup')
})
    .post('/signup', passport.authenticate('signup', {failureRedirect: '/error', failureMessage: 'Not able to register'}), async (_req, res) => {
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