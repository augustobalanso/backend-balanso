import { collection, getDocs, getDoc, setDoc, updateDoc, deleteDoc, doc, arrayUnion, query, where, increment } from "firebase/firestore"
import { v4 as uuidv4 } from 'uuid';
import _ from "lodash";
import firebaseDb from "../../config/firebase.config.js"
import { ProductService } from "../../daos/index.js";

class CartClass{
    constructor(collection){
        this.db = firebaseDb
        this.collection = collection
    }

    async getAll(){
        const querySnapshot = await getDocs(collection(this.db, this.collection))
        const parsedData = []
        querySnapshot.forEach((doc) => {
            parsedData.push({
                id: doc.id,
                ...doc.data()
            })
        })

        return parsedData
    }

    async createCart(){
        const emptyCart = {
            id : uuidv4(),
            timestamp : Date.now(),
            products: []
        }
        const docRef = doc(this.db, this.collection, emptyCart.id)
        try {
            await setDoc(docRef, emptyCart)
            return `Cart ID: ${emptyCart.id} created`
        } catch(err) {
            return {
                error: err
            }
        }
    }

    async addToCartByID(cartId, prodId){

        try{
            const productService = await ProductService()
            const productQuery = await productService.getById(prodId)

            const cartQuery = await this.getCartById(cartId)

            if(cartQuery.success == false){
                return `cart ${cartId} doesn't exists`
            }

            const prodExistsIndex = cartQuery.products.findIndex((prod) => prod.id == prodId)

            if(prodExistsIndex < 0){
                productQuery.qty = 1
                cartQuery.products.push(productQuery)
            } else { 
                cartQuery.products[prodExistsIndex].qty ++
            }

            const docRef = doc(this.db, this.collection, cartId)
            await updateDoc(docRef, {
                products: cartQuery.products
            })
            return `${productQuery.title} added to cart ${cartId}`
        } catch(err){
            return `firebase operation error: ${err}`
        }

    }

    async getCartById(id){
        try {
            const docRef = doc(this.db,this.collection, id)
            const docSnap = await getDoc(docRef)

            if (!docSnap.exists()){
                return {
                    success: false,
                    msg: 'doc not found'
                }
            }
            return docSnap.data()
        } catch(err) {
            return err
        }
    }

    async deleteFromCart(cartId, prodId){
        try{
            const cartQuery = await this.getCartById(cartId)

            // ERROR HANDLER PRE FIND INDEX
            if(cartQuery.success == false){
                return `error fetching cart`
            }
            
            const prodExistsIndex = cartQuery.products.findIndex((prod) => prod.id == prodId)

            // ERROR HANDLER PRE ARRAY INDEX ACCESS
            if(prodExistsIndex < 0) {
                return `product not found in cart ${cartId}`
            }

            if(cartQuery.products[prodExistsIndex].qty > 1){
                cartQuery.products[prodExistsIndex].qty --
            } else {
                cartQuery.products.splice(prodExistsIndex, 1)
            }

            const docRef = doc(this.db, this.collection, cartId)
            await updateDoc(docRef, {
                products: cartQuery.products
            })

            return `deleted product from cart`
        } catch(err){
            return `firebase operation error: ${err}`
        }
    }
}

export default CartClass