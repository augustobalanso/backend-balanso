const router = require('express').Router()
const contenedor = require('../services/database/products/products.knex')
const errorMiddleware = require('../middlewares/errorHandler')

router.get('/health', (_req,res) => {
    res.status(200).json({
        success:true,
        health: 'Up',
        environment: process.env.ENVIRONMENT || 'not found'
    })
})

// POR ALGÚN MOTIVO, HACER LA MISMA FUNCIONALIDAD BAJO QUERY DEMANDA ESTE CHOCLAZO ACÁ ABAJO
router.get('/', async (req,res) => {
    try {
        if(req.query.id){
            res.status(200).json(await contenedor.getByID(req.query.id))
        } else {
            res.status(200).json(await contenedor.getAll())
        }
    }
    catch(error) {
        errorMiddleware(error,req,res)
    }
})

router.get('/:id', async (req,res) => {
    try {
        res.status(200).json(await contenedor.getByID(req.params.id))
    }
    catch(error){
        errorMiddleware(error,req,res)
    }
})

router.post('/', async (req,res) => {
    try {
        res.status(200).json(await contenedor.save(req.body))
    }
    catch(error){
        errorMiddleware(error,req,res)
    }
})

router.put('/:id', async (req,res) => {
    try {
        res.status(200).json(await contenedor.updateByID(req.params.id,req.body))
    }
    catch(error){
        errorMiddleware(error,req,res)
    }
})

router.delete('/:id', async (req,res) => {
    try {
        res.status(200).json(await contenedor.deleteById(Number(req.params.id)))
    }
    catch(error){
        errorMiddleware(error,req,res)
    }
})

router.delete('/', async (_req,res) => {
    try {
        res.status(200).json(await contenedor.deleteAll())
    }
    catch(error){
        errorMiddleware(error,_req,res)
    }
})

module.exports = router