const router = require('express').Router()
const errorMiddleware = require('../middlewares/errorHandler')
const contenedor = require('../../storage/products/initClassProducts')

router.get('/', async (_req, res) => {
    res.render('index')
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