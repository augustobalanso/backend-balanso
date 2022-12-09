import ProductClass from '../../containers/productos/firebase.products.js'

class firebaseProductService extends ProductClass {
    constructor(){
        super('products')
    }
}

export default firebaseProductService