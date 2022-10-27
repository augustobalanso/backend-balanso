const fs = require("fs");

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

        // Chequea el tipo de objeto, si es array numerará IDs para los elementos del array, si es un objeto usará la lógica previamente usada de last array id.
        if(object.length == undefined){
            if(fetchedData.length === 0){
                object.id = 1
            } else {
                object.id = fetchedData[fetchedData.length-1].id + 1
            }
        } else {
            if(fetchedData.length === 0){
                object.forEach((el, i) => {
                    el.id = i+1
                })
            } else {
                let idCount = fetchedData.length + 1
                object.forEach((el) => {
                    el.id = idCount
                    idCount++
                })
            }
        }

        // Procede a escribir el archivo
        try {
            if(object.length == undefined){
                fetchedData.push(object)
                await fs.promises.writeFile(this.archivo,JSON.stringify(fetchedData),'utf-8')
                return {
                    success: true,
                    opType: 'singleproduct',
                    data: object
                }
            } else {
                object.forEach((el) => {
                    fetchedData.push(el)
                })
                await fs.promises.writeFile(this.archivo,JSON.stringify(fetchedData),'utf-8')
                return {
                    success: true,
                    opType: 'multiproduct',
                    data: object
                }
            }
        } catch(err) {
            return {
                success: false,
                msg: 'Error al agregar producto'
            }
        }
    }

    async UpdateById(idFilter, newObject) {
        const searchableArray = JSON.parse(
          await fs.promises.readFile(this.archivo)
        );
    
        // Chequea si el ID existe, devuelve error en caso de que no
        if (searchableArray.some((element) => element.id === idFilter)) {
          const foundIndex = searchableArray.findIndex((element) => element.id == idFilter)
    
          const oldObject = searchableArray[foundIndex]

          newObject.id = idFilter
          searchableArray[foundIndex] = newObject
          
          await fs.promises.writeFile(
            "./productos.txt",
            JSON.stringify(searchableArray)
          );
    
          return {
            success: true,
            oldData: oldObject,
            newData: searchableArray[foundIndex]
          };
        } else {
          return { error: 'producto no encontrado' }
        }
    }
    
    async getById(id) {
        const fetchedData = JSON.parse(await fs.promises.readFile(this.archivo,'utf-8'))
        const filteredData = fetchedData.filter(el => el.id === id)

        if(filteredData.length === 0) {
            return {err: `ID ${id} no encontrado en los productos`}
        } else {
            return filteredData
        }
    }

    async getAll() {
        return JSON.parse(await fs.promises.readFile(this.archivo,'utf-8'))
    }

    async deleteById(id){
        const fetchedData = JSON.parse(await fs.promises.readFile(this.archivo,'utf-8'))

        // El if corrobora que haya filtrado un producto, primero para avisar si no encontro el producto, y segundo para evitar reescribir el archivo si no hay producto a borrar.
        try {
            if(fetchedData.filter(el => el.id === id).length === 0){
                return {error: `Producto con ID ${id} no encontrado, no se puede eliminar.`}
            } else {
                const filteredData = fetchedData.filter(el => el.id !== id)
                await fs.promises.writeFile(this.archivo,JSON.stringify(filteredData),'utf-8')
                return `Producto con ID ${id} eliminado correctamente.`
            }
        } catch(err) {
            return {error: err}
        }
    }

    async deleteAll() {
        await fs.promises.writeFile(this.archivo,'[]','utf-8')
        return {
            success: true,
            msg: 'Se eliminaron todos los productos'
        }
    }
}

module.exports = Contenedor