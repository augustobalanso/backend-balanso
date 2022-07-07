const fs = require('fs');

class Contenedor {
    constructor (fileName) {
        this.fileName = fileName
    }


    async save(array) { 
        
        try {
            const productsFetch = JSON.parse(await fs.promises.readFile(this.fileName,"utf-8"))
            let id = 1

            if(productsFetch.length === 0){
                array.forEach(element => { 
                    element.id = id
                    id++
                });
            } else {
                array.forEach(element => {
                    element.id = productsFetch[productsFetch.length-1].id + id
                    id++
                })
            }

            array.forEach((el) => {
                productsFetch.push(el)
            })

            await fs.promises.writeFile('./productos.txt', JSON.stringify(productsFetch))
            console.log('Agregando los sig. objetos al archivo...')
            console.log(array)
            console.log('Archivo guardado!')
        }

        catch(err){
            console.log('error: ' , err)
        }
    }

    async getById(idFilter){
        const searchableArray = JSON.parse(await fs.promises.readFile(this.fileName))

        // CHECKS IF ID EXISTS, ERROR IF NOT
        if(searchableArray.some(element => element.id === idFilter)){
            const filteredObject = searchableArray.filter(element => element.id == idFilter)
            console.log('objecto encontrado: ',filteredObject)
        } else {
            console.log(`Error de filtrado: id ${idFilter} no encontrado`)
        }
    }

    async getAll(){
        const readArray = JSON.parse(await fs.promises.readFile(this.fileName))
        return console.log('respuesta de getAll(): ', readArray)
    }

    async deleteById(idDelete){

        const searchableArray = JSON.parse(await fs.promises.readFile(this.fileName))
        if(searchableArray.some(element => element.id === idDelete)){
            const filteredObject = searchableArray.filter(element => element.id != idDelete)
            console.log('Borrando ID...')
            await fs.promises.writeFile(this.fileName,JSON.stringify(filteredObject)) 
        } else {
            return (console.log(`Error de borrado: id ${idDelete} no encontrado`))
        }

    }

    async deleteAll(){
        await fs.promises.writeFile(this.fileName,JSON.stringify([]))
        console.log('Base de datos eliminada')
    }
}

const initPrueba = new Contenedor('./productos.txt')

initPrueba.save([{"title":"producto1","price":2000,"thumbnail":"./img/01.jpg"},{"title":"producto2","price":3000,"thumbnail":"./img/02.jpg"},{"title":"producto3","price":4500,"thumbnail":"./img/03.jpg"}])
// initPrueba.getById(1)
// initPrueba.getAll()
// initPrueba.deleteById(3)
// initPrueba.deleteAll()