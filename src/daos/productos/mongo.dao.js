import { ProductSchema } from '../../config/mongo.config.js'
import ProductsClass from '../../containers/productos/mongo.products.js'

class mongoProductService extends ProductsClass {
    constructor(){
        super('products', ProductSchema)
    }
}

export default mongoProductService