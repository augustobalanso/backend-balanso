const { io, http } = require('./app');
const initChatDBContainer = require('./src/services/database/chat/chat.knex');
const initProdDBContainer = require('./src/services/database/products/products.knex')

const PORT = process.env.PORT;

http.listen(PORT, () => console.info(`Server up and running on port ${PORT}`));

io.on('connection', async (socket) => {
    const products = await initProdDBContainer.getAll()
    const chat = await initChatDBContainer.getAll()
    console.info('Nuevo cliente conectado')
    socket.emit('UPDATE_CHAT', chat)
    socket.emit('UPDATE_PRODUCTS', products)

    socket.on('NEW_MESSAGE_TO_SERVER', async (message) => {
        io.sockets.emit('NEW_MESSAGE_TO_SERVER', message)
        await initChatDBContainer.save(message)
    })
    
    socket.on('NEW_PRODUCT_TO_SERVER', async (product) => {
        io.sockets.emit('NEW_PRODUCT_TO_SERVER', product)
        await initProdDBContainer.save(product)
    })
})