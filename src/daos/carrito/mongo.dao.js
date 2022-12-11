import { CartSchema } from '../../config/mongo.config.js'
import CartClass from '../../containers/carrito/mongo.cart.js'

class mongoCartService extends CartClass {
    constructor(){
        super('carts', CartSchema)
    }
}

export default mongoCartService