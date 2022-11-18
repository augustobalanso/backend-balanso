const fs = require('fs');
class ProductService{
    constructor(){}

    async createProduct(data){
        try{
            const products = await fs.promises.readFile(__dirname + '/productos.json');
            const productsObject = JSON.parse(products);
            productsObject.push(data);
            await fs.promises.writeFile(__dirname + '/productos.json', JSON.stringify(productsObject, null, 2));  
            return {
                success: true,
                data
            }
        }catch(err){
            console.error(err);
            return {
                success: false,
                message: err.message
            }
        }
    }

    async getProducts(){
        try{
            const data = await fs.promises.readFile(__dirname + '/productos.json');
            return {
                success: true,
                data: JSON.parse(data)
            }
        }catch(err){
            console.error(err);
            return {
                success: false,
                message: err.message
            }
        }
    }

    async getProduct(uuid){
        try{
            const products = await fs.promises.readFile(__dirname + '/productos.json');
            const productsObject = JSON.parse(products);
            const product = productsObject.filter(i => i.uuid == uuid);
            if (product.length > 0) {
                return {
                    success: true,
                    data: product[0]
                }
            } else {
                return {
                    success: false,
                    message: `producto con id ${uuid} no encontrado`
                }
            }
        
        }catch(err){
            console.error(err);
            return {
                success: false,
                message: err.message
            }
        }
    }

    async updateProduct(uuid, data){

        try{
            let found = false
            const products = await this.getProducts();
            const newList = await products.data.map(i => {
                if(i.uuid == uuid ){
                    found = true
                    return {
                        ...data,
                        timestamp: i.timestamp,
                        uuid
                    }
                }
                return i;
            });

            // CONDITIONAL QUE CHEQUEA SI ENCONTRÓ O NO EL ELEMENTO, PARA NO ESCRIBIR SIEMPRE EN EL ARCHIVO AUNQUE NO HAYA MODIFICACIONES
            if( found ){
                await fs.promises.writeFile(__dirname + '/productos.json', JSON.stringify(newList, null, 2)); 
                return {
                    success: true,
                    data: `Product ${uuid} updated successfully`
                } 
            } else {
                return {
                    success: false,
                    data: `Product ${uuid} not found`
                } 
            }
        } catch(err) {
            console.error(err);
            return {
                success: false,
                message: err.message
            }
        }
    }

    async deleteProduct(uuid){
        try{
            const products = await fs.promises.readFile(__dirname + '/productos.json');
            const productsObject = JSON.parse(products);
            const newProducts = productsObject.filter(i => i.uuid != uuid);
            if (newProducts.length !== productsObject.length) {
                await fs.promises.writeFile(__dirname + '/productos.json', JSON.stringify(newProducts, null, 2)); 
                return {
                    success: true,
                    data: `Product ${uuid} deleted successfully`
                }
            }
            return {
                success: false,
                message: `Product ${uuid} not found`
            }
        } catch(err) {
            console.error(err);
            return {
                success: false,
                message: err.message
            }
        }
    }
};

module.exports = ProductService;