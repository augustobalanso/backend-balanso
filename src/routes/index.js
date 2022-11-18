const router = require('express').Router()
const productos = require('./api/productos/productos.routes')
const carrito = require('./api/carrito/carrito.routes')

router.use('/carrito', carrito)
router.use('/productos', productos)

module.exports = router;