const knexConfig = require('../config');
const knex = require('knex');
const errorHandler = require('../../../middlewares/errorHandler');
const { reject } = require('lodash');

class chatContainer {
    constructor() {
        this.knex = (knex(knexConfig))
        this.knex.schema.hasTable('chat').then(exists => {
            if (!exists) {
                this.knex.schema.createTable('chat', table => {
                        table.increments()
                        table.string('username')
                        table.string('message')
                        table.string('timestamp')
                    })
                    .then(() => console.info('New chatdb created'))
                    .catch(err => errorHandler(err))
            }
        })
    }

    async save(message) {
        Object.assign(message, {
            timestamp: new Date()
        })
        console.log(message)
        await this.knex('chat').insert(message).then(() => {
            resolve({
                success: true,
                data: message
            })
        }).catch(err => {
            reject(err)
        })
    }

    async getAll() {
        const messages = await this.knex.from('chat').select("*")
        return messages
    }
}

const initChatDBContainer = new chatContainer();

module.exports = initChatDBContainer;