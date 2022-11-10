const { io, http } = require('./app')
const fs = require('fs')
const contenedor = require('./storage/initClassProducts')

const messages = JSON.parse(fs.readFileSync('./chatHistory.txt','utf-8'))
const PORT = process.env.PORT;

http.listen(PORT, () => console.info(`Server up and running on port ${PORT}`));

io.on('connection', (socket) => {
    const products = JSON.parse(fs.readFileSync('./productos.txt','utf-8'))
    console.info('Nuevo cliente conectado')
    socket.emit('UPDATE_CHAT', messages)
    socket.emit('UPDATE_PRODUCTS', products)

    socket.on('NEW_MESSAGE_TO_SERVER', (data) => {
        messages.push(data)
        io.sockets.emit('NEW_MESSAGE_TO_SERVER', data)
        fs.writeFileSync('./chatHistory.txt', JSON.stringify(messages), 'utf-8')
    })
    
    socket.on('NEW_PRODUCT_TO_SERVER', async (data) => {
        io.sockets.emit('NEW_PRODUCT_TO_SERVER', data)
        await contenedor.save(data)
    })
})