const fs = require('fs');

class Contenedor {
    constructor (title, price, thumbnail) {
        this.title = title
        this.price = price
        this.thumbnail = thumbnail
    }

    async save(object) { 
        
        try {
            const productsOnFile = fs.promises.readFile('./productos.txt')
                .then((res) => {                
                    const parsedRes = JSON.parse(res);
                    if(parsedRes.length == 0){
                        object.id = 1
                    } else {
                        object.id = parsedRes[parsedRes.length - 1].id + 1
                    }

                    return parsedRes
                }
                )
            console.log("Archivo:", await productsOnFile);

            const newArrayToUpload = await productsOnFile
            newArrayToUpload.push(object)
            console.log(newArrayToUpload)
            fs.writeFileSync('./productos.txt', JSON.stringify(newArrayToUpload))
            }

            catch(err){
                console.log('error: ' , err)
            }
    }

    getById(idFilter){
        // const searchableArray = JSON.parse(fs.readFileSync('./productos.txt'))

        // // CHECKS IF ID EXISTS, ERROR IF NOT
        // if(searchableArray.some(element => element.id === idFilter)){
        //     const filteredObject = searchableArray.filter(element => element.id == idFilter)
        //     console.log(filteredObject)
        // } else {
        //     console.log(`Error de filtrado: id ${idFilter} no encontrado`)
        // }
    }

    getAll(){
        // const readArray = JSON.parse(fs.readFileSync('./productos.txt'))
        // return console.log(readArray)
    }

    deleteById(idDelete){

        // function existsDelete() {
        //     const filteredObject = searchableArray.filter(element => element.id != idDelete)
        //     console.log(filteredObject)
        //     fs.writeFileSync('./productos.txt',JSON.stringify(filteredObject))
        // }

        // function notFoundDelete() {
        //     return (console.log(`Error de borrado: id ${idDelete} no encontrado`))
        // }

        // const searchableArray = JSON.parse(fs.readFileSync('./productos.txt'))
        // if(searchableArray.some(element => element.id === idDelete)){
        //     existsDelete() 
        // } else {
        //     notFoundDelete()
        // }

        // console.log(JSON.parse(fs.readFileSync('./productos.txt')))

    }

    deleteAll(){
        // fs.writeFileSync('./productos.txt',JSON.stringify([]))
    }
}

const initPrueba = new Contenedor()

initPrueba.save({"title":"producto1","price":2000,"thumbnail":"./img/01.jpg"})
initPrueba.save({"title":"producto2","price":3000,"thumbnail":"./img/02.jpg"})
initPrueba.save({"title":"producto3","price":4500,"thumbnail":"./img/03.jpg"})
// initPrueba.getById('1')
// initPrueba.getAll()
// initPrueba.deleteById('2')
// initPrueba.deleteAll()