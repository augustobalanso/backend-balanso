const errorMiddleware = require('../../../middleware/errorHandler')
const { v4: uuidv4 } = require('uuid')
const router = require('express').Router()
const ProductService = require('../../../services/productos/productos.service')
const _ = require('lodash')
const productService = new ProductService()

const login = require('../../../middleware/login')


router.get('/health', (_req, res) => {
    res.status(200).json({
        success: true,
        environment: process.env.ENVIRONMENT || 'undefined',
        health: 'Up!'
    })
})


router.get('/', async (_req, res, next) => {
    try {
        res.status(200).json(await productService.getProducts())
    }
    catch(err) {
        next(err);
    }
})

router.get('/:uuid', async (req, res, next) => {
    try {
        const { uuid } = req.params
        res.status(200).json(await productService.getProduct(uuid))
    }
    catch(err) {
        next(err);
    }
})

router.post('/', login , async (req, res, next) => {
    try{
        const { body } = req;
        if(_.isNil(body))(res.status(400).json({success: false, message: "REQ ERROR (Body missing)"}));
        Object.assign(body, {
            uuid: uuidv4(),
            timestamp: Date.now()
        });
        const data = await productService.createProduct(body);
        if(!data.success)(res.status(500).json(data))
        res.status(200).json(data);
    }catch(err){
        next(err);
    }   
});

router.put('/:productUuid', login, async(req, res, next) => {
    try{
        const { productUuid } = req.params;
        const {body} = req;
        Object.assign(body, {
            lastEditTimestamp: Date.now()
        });
        if(_.isNil(productUuid) || _.isNil(body))(res.status(400).json({success: false, message: "Req error"}));
        const data = await productService.updateProduct(productUuid, body)
        if(!data.success) {
            res.status(500).json(data)
        } else {
            res.status(200).json(data);
        }
    }catch(err){
        next(err);
    }
});

router.delete('/:productUuid', login, async (req,res,next) => {
    try{
        const { productUuid } = req.params;
        if(_.isNil(productUuid))(res.status(400).json({success: false, message: "Req error"}));
        const data = await productService.deleteProduct(productUuid)
        if(!data.success) {
            res.status(500).json(data)
        } else {
            res.status(200).json(data);
        }
    } catch(err){
        next(err);
    }
})


module.exports = router