const getProductModule = async () => {
    const dataCore = process.env.DATACORE;
    if (dataCore == "FIREBASE") {
        const ProdModuleSource = await import('./productos/firebase.dao.js')
        return ProdModuleSource.default
    } else if(dataCore == "MONGO"){
        const ProdModuleSource = await import('./productos/mongo.dao.js')
        return ProdModuleSource.default
    } else {
        return {
            success: "false",
            msg: "DAO failed to load"
        }
    }
}

const getCartModule = async () => {
    const dataCore = process.env.DATACORE;
    if (dataCore == "FIREBASE") {
        const CartModuleSource = await import('./carrito/firebase.dao.js')
        return CartModuleSource.default
    } else if(dataCore == "MONGO"){
        const CartModuleSource = await import('./carrito/mongo.dao.js')
        return CartModuleSource.default
    } else {
        return {
            success: "false",
            msg: "DAO failed to load"
        }
    }
}

const ProductService = async() => {
    const ProductClass = await getProductModule();
    const productService = new ProductClass();
    return productService
}

const CartService = async() => {
    const CartClass = await getCartModule();
    const cartService = new CartClass();
    return cartService
}

export {
    ProductService,
    CartService
} 