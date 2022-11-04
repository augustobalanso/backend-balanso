const router = require('express').Router()
const productos = require('./products')
const productosHTML = require('./productsHTML')

router.use('/api', productos)
router.use('/productos', productosHTML)

module.exports = router;