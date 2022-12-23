import { Router } from "express";
import ProductsRandom from "../services/productos.random.js";
const router = Router()

const initProductsRandom = new ProductsRandom()   

router.get('/', (_req, res) => {


    try{
        const randomProducts = initProductsRandom.get5random()
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