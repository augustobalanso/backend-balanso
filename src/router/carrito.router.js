import express from 'express'
const router = express.Router()
import { CartService } from '../daos/index.js' 


router.get('/', async (_req,res) => {
    const cartData = await CartService().then((data) => data.getAll())

    res.status(200).json({
        success: true,
        data: cartData
    })
})



export default router