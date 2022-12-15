import knex from "knex";

const knexConfig = {
    client: 'sqlite3',
    connection: {
      filename: process.env.SQLITE_FILENAME,
      flags: ['OPEN_URI', 'OPEN_SHAREDCACHE']
    },
    useNullAsDefault: true
};

const knexConnect = knex(knexConfig)

async function initKnex(){

    knexConnect.schema.hasTable('products').then(exists => {
        if(!exists){
            knexConnect.schema.createTable('products', (table) => {
                table.string('title');
                table.string('desc');
                table.string('id');
                table.integer('codigo');
                table.integer('price');
                table.string('thumbnail');
                table.integer('stock');
                table.integer('timestamp');
                table.increments('sqliteId');
            })
            .then(() => console.log('Products table created'))
        }
    })

    knexConnect.schema.hasTable('carts').then(exists => {
        if(!exists){
            knexConnect.schema.createTable('carts', (table) => {
                table.string('id')
                table.integer('timestamp')
                table.increments('sqliteId');
            })
            .then(() => console.log('Cart table created'))
        }
    })

    knexConnect.schema.hasTable('productsInCart').then(exists => {
        if(!exists){
            knexConnect.schema.createTable('productsInCart', (table) => {
                table.string('cartId')
                table.string('prodId')
                table.integer('qty')
                table.increments('sqliteId');
            })
            .then(() => console.log('ProductsInCart table created'))
        }
    })

}

initKnex()

export default knexConnect