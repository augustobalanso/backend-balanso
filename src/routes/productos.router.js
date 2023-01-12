import { Router } from "express";
import productsRandom from "../services/products/productos.random.js";
const router = Router()

router.get('/', async (_req, res) => {

    try{
        const randomProducts = await productsRandom.get5random()
        res.status(200).json({
            success: true,
            data: randomProducts
        })
    } catch(err){
        res.status(500).json({
            success: false,
            msg: err.message
        })
    }

})

export default router