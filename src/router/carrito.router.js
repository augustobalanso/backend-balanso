import express from 'express'
const router = express.Router()
import { CartService } from '../daos/index.js' 

// NO PARAMS

router
    .get('/', async (_req,res) => {
        try{
            const cartData = await CartService().then((data) => data.getAll())
            res.status(200).json({
                success: true,
                data: cartData
            })
        } catch(err) {
            res.status(400).json({
                success: false,
                msg: err
            })
        }
    })
    .post('/', async (_req, res) => {
        try{
            const createCartResponse = await CartService().then((data) => data.createCart())
            res.status(200).json({
                success: true,
                data: createCartResponse
            })
        } catch(err){
            res.status(400).json({
                success: false
            })
        }
    })

// PARAMS ID

router
    .get('/:id', async (req, res) => {
        const { id } = req.params
        const response = await CartService().then((data) => data.getCartById(id))

        res.status(200).json({
            success: true,
            response: response
        })
    })

router
    .post('/:cartId/prod/:prodId', async (req, res) =>{
        try{
            const { cartId, prodId } = req.params
            const addProdToCart = await CartService().then((data) => data.addToCartByID(cartId, prodId))
            res.status(200).json({
                success: true,
                data: addProdToCart
            })
        } catch(err){
            console.log(err)
        }
    })
    .delete('/:cartId/prod/:prodId', async (req, res) =>{
        try{
            const { cartId, prodId } = req.params
            const deleteFromCart = await CartService().then((data) => data.deleteFromCart(cartId, prodId))
            res.status(200).json({
                success: true,
                data: deleteFromCart
            })
        } catch(err){
            console.log(err)
        }
    })

export default router