import knex from '../../config/sqlite.config.js'
import {
    v4 as uuidv4
} from 'uuid'

class ProductsClass {
    constructor(table) {
        this.table = table
    }

    async getAll() {
        return knex(this.table).select()
    }

    async addItem(item) {
        item.timestamp = Date.now()
        item.id = uuidv4()
        await knex(this.table).insert(item)
        return 'item added to db'
    }

    async getById(id) {
        const prodFetched = await knex(this.table).where({
            id: id
        })
        if (prodFetched.length === 0) {
            return 'item not found'
        }
        return prodFetched
    }

    async updateItem(id, item) {
        await knex(this.table).where({id: id}).update(item)
        return 'item updated'
    }

    async deleteItem(id) {
        await knex(this.table).where({id: id}).del()
        return 'item deleted'
    }
}

export default ProductsClass