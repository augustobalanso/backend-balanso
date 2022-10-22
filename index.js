const fs = require("fs");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

class Contenedor {
    constructor(archivo) {
        this.archivo = archivo
    }

    async save(object) {

        // Chequea existencia del archivo, sino lo crea
        if(!fs.existsSync(this.archivo)){
           await fs.promises.writeFile(this.archivo,'[]','utf-8')
        }

        // Trae siempre los datos dentro del archivo, esté o no vacío.
        const fetchedData = JSON.parse(await fs.promises.readFile(this.archivo,'utf-8'))        

        // Chequea si el array dentro del archivo contiene productos, sino asigna el 1 como id
        if(fetchedData.length === 0){
            object.id = 1
            console.log(`ID asignado: ${object.id}`)
        } else {
            object.id = fetchedData[fetchedData.length-1].id + 1
            console.log(`ID asignado: ${object.id}`)
        }

        // Procede a escribir el archivo
        try {
            fetchedData.push(object)
            await fs.promises.writeFile(this.archivo,JSON.stringify(fetchedData),'utf-8')
        } catch(err) {
            console.error(err)
        }
    }

    async getById(id) {
        const fetchedData = JSON.parse(await fs.promises.readFile(this.archivo,'utf-8'))
        const filteredData = fetchedData.filter(el => el.id === id)

        console.log(filteredData)

        if(filteredData.length === 0) {
            console.log(`ID ${id} no encontrado en los productos`)
        } else {
            console.log(filteredData)
        }
    }

    async getAll() {
        console.log(JSON.parse(await fs.promises.readFile(this.archivo,'utf-8')))
    }

    async deleteById(id){
        const fetchedData = JSON.parse(await fs.promises.readFile(this.archivo,'utf-8'))

        // El if corrobora que haya filtrado un producto, primero para avisar si no encontro el producto, y segundo para evitar reescribir el archivo si no hay producto a borrar.
        try {
            if(fetchedData.filter(el => el.id === id).length === 0){
                console.log(`Producto con ID ${id} no encontrado, no se puede eliminar.`)
            } else {
                const filteredData = fetchedData.filter(el => el.id !== id)
                await fs.promises.writeFile(this.archivo,JSON.stringify(filteredData),'utf-8')
                console.log(`Producto con ID ${id} eliminado correctamente.`)
            }
        } catch(err) {
            console.log(err)
        }
    }

    async deleteAll() {
        await fs.promises.writeFile(this.archivo,'[]','utf-8')
    }
}

const Productos = new Contenedor('./productos.txt')

app.get("/", (req, res) => {
  res.send(
    '<a href="./productos">Productos</a><br><a href="./productoRandom">Producto aleatorio</a>'
  );
});

app.get("/productos", async (req, res) => {
  const productsFetch = JSON.parse(
    await fs.promises.readFile("./productos.txt")
  );
  let productsFetchTable = []
  
  await Promise.all(productsFetch.map(async(el) => {
    productsFetchTable.push(`
      <tr>
        <td>${await el.title}</td>
        <td>${await el.price}</td>
        <td>${await el.thumbnail}</td>
        <td>${await el.id}</td>
      </tr>`)
  }))

  res.send(
    `<table>
      <tr>
        <th>Producto</th>
        <th>Precio</th>
        <th>Imagen</th>
        <th>ID</th>
      </tr>
      ${productsFetchTable.map((el) => {
        return el
      })}
    </table>
    <br>
    <a href='../'>Volver</a>`
  );
});

app.get("/productoRandom", async (req, res) => {
  const productsFetch = JSON.parse(
    await fs.promises.readFile("./productos.txt")
  );

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const randomProduct = () => {
    return productsFetch[getRandomInt(1, productsFetch.length) - 1];
  };

  const fetchedProduct = randomProduct()
  
  res.send(
    `
    <table>
      <tr>
        <th>Producto</th>
        <th>Precio</th>
        <th>Imagen</th>
        <th>ID</th>
      </tr>
      <tr>
        <td>${fetchedProduct.title}</td>
        <td>${fetchedProduct.price}</td>
        <td>${fetchedProduct.thumbnail}</td>
        <td>${fetchedProduct.id}</td>
      </tr>
    </table>
    <br>
    <a href='../'>Volver</a>
    <a href='/productoRandom'>Reintentar</a>
    `);
});

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

// Productos.save({title:"Nike Air Jordan",price:40000,thumbnail:"./static/img/nikeaj01.jpg"})
// Productos.save({title:"Nike Air Max",price:48000,thumbnail:"./static/img/nikeam02.jpg"})
// Productos.save({title:"Nike Pegasus",price:60000,thumbnail:"./static/img/nikepeg03.jpg"})

