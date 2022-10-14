const fs = require('fs')

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

Productos.save({title:"Nike Air Jordan",price:40000,thumbnail:"./static/img/nikeaj01.jpg"})
Productos.getById(1)
Productos.getAll()
Productos.deleteById(3)
Productos.deleteAll()