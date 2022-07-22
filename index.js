const express = require("express");
const Contenedor = require("./utils/contenedor");
const { Router } = express

const app = express();
const router = Router()
app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use('/api/productos', router);
app.use('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})
const contenedor = new Contenedor("./productos.txt")

router.get('/', async (req,res) => {
    
    if((req.query.id && req.query.title && req.query.thumbnail && req.query.price)){
        res.json (await contenedor.UpdateById(Number(req.query.id), {title: req.query.title , price: req.query.price, thumbnail: req.query.thumbnail}))
    } else if (req.query.id){
        res.json ( await contenedor.getById(Number(req.query.id)))
    } else {
        res.send( await contenedor.getAll())
    }
})

router.get('/:id', async (req, res) => {
    if (req.query.iddel){
        res.json (await contenedor.deleteById(Number(req.query.iddel)))
    } else {
        res.send ( await contenedor.getById(Number(req.params.id)))
    }

}) 

router.post('/', async (req,res) => {
    res.send (await contenedor.save([req.body]))
})

router.put('/:id', async (req,res) => {
    res.json (await contenedor.UpdateById(Number(req.params.id), req.body))
})

router.delete('/:id', async (req, res) => {
    res.json (await contenedor.deleteById(Number(req.params.id)))
})

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
