import CartClass from "../../containers/carrito/sqlite.cart.js";

class sqliteCartService extends CartClass {
    constructor(){
        super('carts', 'products', 'productsInCart')
    }
}

export default sqliteCartService