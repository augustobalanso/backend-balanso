import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { ProductService } from "../../daos/index.js";

class CartClass{
    constructor(collection, schema) {
        this.model = mongoose.model(collection, schema)
    }

    async getAll(){
        const items = await this.model.find()
        return items
    }

    async createCart(){
        const emptyCart = {
            _id : uuidv4(),
            timestamp : Date.now(),
            products: []
        }

        try {
            this.model.create(emptyCart)
            return `created Cart ID: ${emptyCart._id}`
        } catch(err) {
            return {
                error: err
            }
        }
    }

    async addToCartByID(cartId, prodId){

        try{
            const productService = await ProductService()
            const productQuery = JSON.parse(JSON.stringify(await productService.getById(prodId)))

            const cartQuery = JSON.parse(JSON.stringify(await this.getCartById(cartId)))

            // ERROR HANDLERS
            if(cartQuery.success == false){
                return `cart ${cartId} doesn't exists`
            }
            if(productQuery == 'item not found'){
                return `product with id ${prodId} not found`
            }

            const prodExistsIndex = cartQuery.products.findIndex((prod) => prod._id == prodId)

            if(prodExistsIndex < 0){
                productQuery.qty = 1
                return this.model.updateOne({_id: cartId}, {$push: { products: productQuery }})
            } else { 
                return this.model.updateOne({_id: cartId, "products._id": prodId }, { $inc : { "products.$.qty" : 1 } })
            }

        } catch(err){
            return `mongo operation error: ${err}`
        }

    }

    async getCartById(id){
        try {

            const boolDocRef = await this.model.exists({_id : id})

            if(!_.isNil(boolDocRef)){
                return this.model.findOne({_id : id})
            }
            return {
                success: false,
                msg: 'cart not found'
            }

        } catch(err) {
            return err
        }
    }

    async deleteFromCart(cartId, prodId){
        try{

            const cartQuery = JSON.parse(JSON.stringify(await this.getCartById(cartId)))

            // ERROR HANDLER PRE FIND INDEX
            if(cartQuery.success == false){
                return `error fetching cart`
            }
            
            const prodExistsIndex = cartQuery.products.findIndex((prod) => prod._id == prodId)
            
            if(prodExistsIndex < 0) {
                return `product in cart not found`
            }

            const prodQueryQty = cartQuery.products[prodExistsIndex].qty

            // ERROR HANDLER PRE INDEX ACCESS
            if(prodQueryQty > 1){
                console.log('se saco 1')
                return this.model.updateOne({_id: cartId, "products._id": prodId }, { $inc : { "products.$.qty" : -1 } })
            } else { 
                console.log('se saco el ultimo')
                return this.model.updateOne({_id: cartId }, { $pull : { products: { _id: prodId} } })
            }

        } catch(err){
            return `mongo operation error: ${err}`
        }
    }
}

export default CartClass