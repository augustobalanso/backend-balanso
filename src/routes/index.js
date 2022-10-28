const express = require('express');
const router = express.Router();
const Contenedor = require('../../utils/contenedor')

const contenedor = new Contenedor("./productos.txt")


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
        if((req.query.id && req.query.title && req.query.thumbnail && req.query.price)){
            res.status(200).json(await contenedor.UpdateById(Number(req.query.id), {title: req.query.title , price: req.query.price, thumbnail: req.query.thumbnail}))
        } else if(req.query.id){
            res.status(200).json(await contenedor.getById(Number(req.query.id)))
        } else if(req.query.iddel) {
            res.status(200).json(await contenedor.deleteById(Number(req.query.iddel)))
        } else {
            res.status(200).json(await contenedor.getAll())
        }
    }
    catch {
        res.status(500).json(err)
    }
})

router.get('/:id', async (req,res) => {
    try {
        res.status(200).json(await contenedor.getById(Number(req.params.id)))
    }
    catch(err){
        res.status(500).json(err)
    }
})

router.post('/', async (req,res) => {
    try {
        res.status(200).json(await contenedor.save(req.body))
    }
    catch(err){
        res.status(500).json(err)
    }
})

router.put('/:id', async (req,res) => {
    try {
        res.status(200).json(await contenedor.UpdateById(Number(req.params.id),req.body))
    }
    catch(err){
        res.status(500).json(err)
    }
})

router.delete('/:id', async (req,res) => {
    try {
        res.status(200).json(await contenedor.deleteById(Number(req.params.id)))
    }
    catch(err){
        res.status(500).json(err)
    }
})

router.delete('/', async (_req,res) => {
    try {
        res.status(200).json(await contenedor.deleteAll())
    }
    catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;