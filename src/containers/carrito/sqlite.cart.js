import knex from '../../config/sqlite.config.js'
import { v4 as uuidv4 } from 'uuid'
import { ProductService } from '../../daos/index.js'
import e from 'express'

class CartClass{
    constructor(table, prodTable, subtable) {
        this.table = table
        this.subtable = subtable
        this.prodTable = prodTable
    }

    async getAll(){
        const cartsTable = await knex(this.table).select('id','sqliteId','timestamp')

        // BUILD A JS ARRAY OF OBJECTS ON PRODUCTS, SOMETHING QUITE UNNERVING FOR SQL DBS
        const populatedCartsTable = await Promise.all(
            cartsTable.map(async (cart) => {
                const prodsInCart = await knex(this.subtable).select().where({cartId: cart.id})
                if(prodsInCart.length > 0){
                    cart.products = await Promise.all(
                        prodsInCart.map(async (prod) =>{
                            const product = await knex(this.prodTable).select().where({id: prod.prodId})
                            product[0].qty = prod.qty
                            return product[0]
                        })
                    )
                }
                return cart
            })
        )

        return populatedCartsTable
    }

    async createCart(){
        const Cart = {
            id: uuidv4(),
            timestamp: Date.now()
        }
        await knex(this.table).insert(Cart)
        return `cartId: ${Cart.id} created in DB`
    }

    async addToCartByID(cartId, prodId){

        // CHECK IF CART AND PRODUCT EXIST IN THEIR RESPECTIVE TABLES 
        const cartSelected = await knex(this.table).select().where({ id: cartId })
        const productSelected = await knex(this.prodTable).select().where({id: prodId})

        if(cartSelected.length == 0){
            return 'cartid not found'
        }

        if(productSelected.length == 0){
            return 'product not found'
        }
        // 

        const Order = {
            cartId: cartId,
            prodId: prodId,
            qty: 1
        }
        
        // CHECK IF PRODUCT IS ALREADY IN CART, IT UPDATES QTY IF IT IS, ADDS IT IF NOT.
        const prodInCartCheck = await knex(this.subtable).select().where({prodId : prodId, cartId: cartId}) 

        if(prodInCartCheck.length == 0){
            await knex(this.subtable).insert(Order)
            return 'product created in order'
        }
            
        await knex(this.subtable).where({prodId : prodId, cartId: cartId}).increment('qty',1)
        return 'added +1 product.qty'
    }

    async getCartById(id){
        const cartSelected = await knex(this.table).select().where({ id: id })

        // BUILD A JS ARRAY OF OBJECTS ON PRODUCTS, SOMETHING QUITE UNNERVING FOR SQL DBS
        const populatedCartsTable = await Promise.all(
            cartSelected.map(async (cart) => {
                const prodsInCart = await knex(this.subtable).select().where({cartId: cart.id})
                if(prodsInCart.length > 0){
                    cart.products = await Promise.all(
                        prodsInCart.map(async (prod) =>{
                            const product = await knex(this.prodTable).select().where({id: prod.prodId})
                            product[0].qty = prod.qty
                            return product[0]
                        })
                    )
                }
                return cart
            })
        )
        // 

        return populatedCartsTable
    }

    async deleteFromCart(cartId, prodId){
        const prodInCartCheck = await knex(this.subtable).select().where({prodId : prodId, cartId: cartId}) 

        if(prodInCartCheck.length == 0){
            return 'product to delete not found'
        }
        
        if(prodInCartCheck[0].qty > 1){
            await knex(this.subtable).where({prodId : prodId, cartId: cartId}).increment('qty',-1)
            return 'removed 1 product.qty'
        }
        
        await knex(this.subtable).where({prodId : prodId, cartId: cartId}).del()
        return 'removed last product remaining'
    }
}

export default CartClass