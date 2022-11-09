const router = require('express').Router()
const errorMiddleware = require('../middlewares/errorHandler')
const contenedor = require('../../storage/initClassProducts')

router.get('/', async (_req, res) => {
    res.render('index')
})

router.get('/lista', async (_req, res) => {
    try {
        res.render('productos', { products: await contenedor.getAll()})
    }
    catch(error){
        errorMiddleware(error,_req,res)
    }
})

// router.post('/', async (req,res) => {
//     console.log(req.body)
//     try {
//         res.status(200).json(await contenedor.save(req.body))
//     }
//     catch(error){
//         errorMiddleware(error,req,res)
//     }
//     finally{
//         res.status(200).redirect('/productos')
//     }
// })

module.exports = router