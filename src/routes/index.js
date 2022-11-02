const router = require('express').Router()
const productos = require('./products')

router.use('/productos', productos)

module.exports = router;