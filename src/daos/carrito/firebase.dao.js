import CartClass from '../../containers/carrito/firebase.cart.js'

class firebaseCartService extends CartClass {
    constructor(){
        super('carts')
    }
}

export default firebaseCartService