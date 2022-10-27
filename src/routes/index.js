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

router.get('/', async (_req,res) => {
    try {
        res.status(200).json(await contenedor.getAll())
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