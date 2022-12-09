import express from 'express'
const router = express.Router()
import ProductsRouter from './productos.router.js'
import CartsRouter from './carrito.router.js'

router.use('/carrito', CartsRouter)

router.use('/productos', ProductsRouter)

export default router