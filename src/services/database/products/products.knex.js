const knexConfig = require('../config');
const knex = require('knex');
const { v4: uuidv4 } = require('uuid')
const errorHandler = require('../../../middlewares/errorHandler')

class prodContainer {
    constructor() {
        this.knex = (knex(knexConfig))
        this.knex.schema.hasTable('products').then(exists => {
            if (!exists) {
              this.knex.schema.createTable('products', table => {
                table.increments()
                table.string('title');
                table.string('price');
                table.string('thumbnail');
                table.string('code');
                table.string('timestamp')
              })
                .then(() => console.info('New table created'))
                .catch(err => errorHandler(err))
            }
        })
    }

    async save(product) {
        try {
            Object.assign(product, {
                code: uuidv4(),
                timestamp: new Date()
            })
            console.log(product)
            await this.knex('products').insert(product)
            return `producto añadido con éxito ${product.title}`
        } catch(err) {
            errorHandler(err)
        }
    }

    async getByID(code) {
        try {
            console.log(code)
            const fetchedID = await this.knex('products').where('code', code)
            if(JSON.stringify(fetchedID) !== '[]'){
                return fetchedID
            } else {
                return {
                    success: false,
                    msg: `Producto con id ${code} no encontrado`
                }
            }

        } catch(err) {
            errorHandler(err)
        }
    }

    async updateByID(code, producto){
        try {
            await this.knex('products')
                .where({code: code})
                .update(producto)
            return await this.knex('products').where({code: code})
        } catch(err) {
            errorHandler(err)
        }
    }

    async getAll() {
        try {
            let arrProd = await this.knex.from('products').select("*")
            return arrProd
        }
        catch (err) {
            errorHandler(err)
        }
    }

    async deleteByID(code) {
        try {
            await this.knex('products').where({code : code}).del()
            return { success: `elemento con id ${code} eliminado`}
        } catch {
            errorHandler(err)
        }
    }

}

const initProdDBContainer = new prodContainer();

module.exports = initProdDBContainer;