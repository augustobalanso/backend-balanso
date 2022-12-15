import ProductsClass from "../../containers/productos/sqlite.products.js";

class sqliteProductService extends ProductsClass {
    constructor(){
        super('products')
    }
}

export default sqliteProductService