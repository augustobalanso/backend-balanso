const errorMiddleware = require('../../../middleware/errorHandler')
const router = require('express').Router()
const CartService = require('../../../services/carrito/carrito.service')
const cartService = new CartService('/carrito.json')

router.get('/health', (_req, res) => {
    res.status(200).json({
        success: true,
        environment: process.env.ENVIRONMENT || 'undefined',
        health: 'Up!'
    })
})

router
    .get('/', async (_req, res) => {
        try{
            res.status(200).json(await cartService.getCarts())
        }catch(error){
            errorMiddleware(error)
        }
    })
    .post('/', async (_req, res) => {
        try{
            res.status(201).json(await cartService.createCart())
        } catch(error){
            errorMiddleware(error)
        }
    })



router
    .get('/:id', async (req, res) => {
        try{
            const { id } = req.params
            res.status(200).json(await cartService.getCart(id))
        } catch(error){
            errorMiddleware(error)
        }
    })
    .delete('/:id', async (req, res) => {
        try{
            const { id } = req.params
            res.status(200).json(await cartService.deleteCart(id))
        } catch(error) {
            errorMiddleware(error)
        }
    })

router
    .get('/:id/productos', async (req, res) => {
        const { id } = req.params
        const fetchedCart = await cartService.getCart(id)
        res.status(200).json(fetchedCart.data)
    })
    .post('/:id/productos/:id_prod', async (req, res) => {
        const { id, id_prod } = req.params
        res.status(201).json(await cartService.addToCart(id, id_prod))
    })
    .delete('/:id/productos/:id_prod', async (req, res) => {
        const { id, id_prod } = req.params
        res.status(200).json(await cartService.deleteFromCart(id, id_prod))
    })


module.exports = router