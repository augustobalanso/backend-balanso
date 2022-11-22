const fs = require('fs');
const { all } = require('../../routes/api/productos/productos.routes');
const ProductService = require('../productos/productos.service')
const productService = new ProductService()

class CartService{
    constructor(filename) {
        this.fileName = filename
    }

    async createCart() {
        try{
            const fetchedCart = JSON.parse(await fs.promises.readFile(__dirname + this.fileName));
            const id = fetchedCart[fetchedCart.length - 1].id + 1;
            const initCart = { id, timestamp: Date.now(), products: [] };
            fetchedCart.push(initCart);
            fs.writeFileSync(__dirname + '/carrito.json', JSON.stringify(fetchedCart));

            return {
                success: true,
                newcartid: id
            };
        } catch(err){
            return {
                success: false,
                message: err
            }
        }

    }

    async getCarts(){
        try{
            const allCarts = JSON.parse(await fs.promises.readFile(__dirname + this.fileName));
            return {
                success: true,
                data: allCarts
            }
        } catch(error){
            return {
                success: false,
                message: error
            }
        }
    }

    
    async getCart(id){
        const allCarts = JSON.parse(await fs.promises.readFile(__dirname + '/carrito.json'));
        const foundCart = allCarts.filter(cart => cart.id == id);
        if (foundCart.length > 0) {
            return {
                success: true,
                data: foundCart
            }
        } else {
            return {
                success: false,
                message: `ID de carrito ${id} no encontrado`
            }
        }
    }

    async addToCart(id, id_prod) {
        try {
            
            const allCarts = JSON.parse(await fs.promises.readFile(__dirname + this.fileName))
            const foundCart = allCarts.find(cart => cart.id == id)
            const fetchedProd = await productService.getProduct(id_prod)

            if (fetchedProd.success) {
                foundCart.products.push(fetchedProd.data)
            } else {
                const response = {
                    success: false
                }
                if (fetchedProd.message) {
                    Object.assign(response, {
                        message: fetchedProd.message
                    }) 
                }
                return response
            }

            const newCarts = allCarts.map(cart => {
                if (cart.id == id) {
                    return foundCart
                }
                return cart
            })

            await fs.promises.writeFile(__dirname + this.fileName, JSON.stringify(newCarts, null, 2))

            return {
                success: true,
                message: `producto con id ${id_prod} añadido`,
            }

        }catch(err){
            console.error(err);
            return {
                success: false,
                message: err.message
            }
        }
    }

    async deleteFromCart(id, id_prod) {
        try{
            const allCarts = JSON.parse(await fs.promises.readFile(__dirname + this.fileName))

            const fetchedCart = allCarts.filter(cart => cart.id == id)
            if (fetchedCart.length == 0) {
                return {
                    success: false,
                    message: `id de carrito ${id} no encontrado`
                }
            }

            const splicedProdArray = fetchedCart[0].products.filter(prod => prod.uuid != id_prod)
            if (splicedProdArray.length == 0) {
                return {
                    success: false,
                    message: `id de producto ${id_prod} no encontrado en el carrito ${id}`
                }
            }

            fetchedCart[0].products = splicedProdArray
    
            const newCarts = allCarts.map(cart => {
                if (cart.id == id) {
                    return fetchedCart[0]
                }
                return cart
            })
    
            await fs.promises.writeFile(__dirname + this.fileName, JSON.stringify(newCarts, null, 2))
    
            return {
                success: true, 
                data: newCarts
            }
            
        } catch(err){
            console.error(err);
            return {
                success: false,
                message: err.message
            }
        }
    }

    async deleteCart(id){
        try{
            const allCarts = await this.getCarts()

            // NOT FOUND ESCAPE
            if(allCarts.data.filter((cart) => cart.id == id).length == 0){
                return {
                    success: false,
                    message: `cartID ${id} no encontrado`
                }
            }

            const filteredCarts = allCarts.data.filter((cart) => cart.id != id)
            await fs.promises.writeFile(__dirname + this.fileName, JSON.stringify(filteredCarts))
            return {
                success: true,
                message: `Id ${id} deleted`
            }
        } catch(err) {
            console.error(err)
            return {
                success: false,
                message: err.message
            }
        }
    }
};

module.exports = CartService;