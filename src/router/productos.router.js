import express from 'express'
const router = express.Router()
import _ from 'lodash'
import { ProductService } from '../daos/index.js'
 
router
    .get('/', async (_req, res) => {
        try {
            const productService = await ProductService().then((data) => data.getAll())

            res.status(200).json({
                success: true,
                data: productService
            })

        } catch(err) {
            res.status(400).json({
                success: false,
                message: err.message
            })
        }
    })
    .post('/', async (req, res) => {
    try {
        const { title, price, thumbnail, stock } = req.body
        if(_.isEmpty(title) || !_.isNumber(price) || !_.isNumber(stock) || _.isEmpty(thumbnail)){
            return res.status(400).json({
                msg: 'title, price, thumbnail and/or stock are missing'
            })
        }

        const newItem = req.body
        newItem.timestamp = Date.now()

        const response = await ProductService().then((data) => data.addItem(newItem))
        res.status(201).json({
            success: true,
            data: response
        })
    } catch(err) {
        res.status(400).json({
            success: false,
            error: err.name,
            message: err.message
        })
    }
    })

router
    .get('/:uuid', async (req, res) => {
        try {
            const { uuid } = req.params
            const response = await ProductService().then((data) => data.getById(uuid))
            res.status(200).json({
                success: true,
                data: response
            })
        }
        catch(err) {
            res.status(400).json({
                success: false,
                error: err.name,
                message: err.message
            })
        }
    })
    .put('/:uuid', async (req, res) => {
        try{
            const { body } = req
            const { uuid } = req.params
            const response = await ProductService().then((data) => data.updateItem(uuid, body))
            res.status(200).json({
                success: true,
                data: response
            })
        } catch(err) {
            res.status(400).json({
                success: false,
                error: err.name,
                message: err.message
            })
        }
    })
    .delete('/:uuid', async (req, res) => {
        try{
            const { uuid } = req.params
            const response = await ProductService().then((data) => data.deleteItem(uuid))
            res.status(200).json({
                success: true,
                data: response
            })
        } catch(err) {
            res.status(400).json({
                success: false,
                error: err.name,
                message: err.message
            })
        }
    })

export default router