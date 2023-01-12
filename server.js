import { http , io } from "./app.js"
import mongoose from "mongoose";
import mongooseChatConnection from "./src/services/mongo/config/chat.config.js";
import MessageSchema from "./src/services/mongo/models/chat.models.js";
import productsRandom from "./src/services/products/productos.random.js";
import { schema, normalize } from "normalizr";
import { v4 as uuid } from "uuid"; 

const PORT = process.env.PORT || 8000

const mongoChatModel = mongooseChatConnection.model('chats', MessageSchema)

http.listen(PORT, () => console.info(`Server up and running on port ${PORT}`));

const authorSchema = new schema.Entity('author',{}, { idAttribute: 'email'})
const messageSchema = new schema.Entity('msg',{
    author: authorSchema,
}, { idAttribute: '_id' })

const messagesSchema = [messageSchema]

io.on('connection', async (socket) => {
    const fetchedChat = await mongoChatModel.find()
    const normalizedData = normalize(JSON.parse(JSON.stringify(fetchedChat)), messagesSchema)
    console.info('Nuevo cliente conectado, id:', socket.id)
    socket.emit('UPDATE_CHAT', normalizedData)

    socket.on('RECEIVE_PRODUCTS', async () => {
        const products5 = await productsRandom.get5random()
        io.sockets.emit('UPDATE_PRODUCTS', products5)
    })

    socket.on('NEW_MESSAGE_TO_SERVER', async (data) => {
        io.sockets.emit('NEW_MESSAGE_TO_SERVER', data)
        data._id = uuid()
        mongoModel.create(data)
    })
})