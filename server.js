import { http , io } from "./app.js"
import mongoose from "mongoose";

const PORT = process.env.PORT || 8000

http.listen(PORT, () => console.info(`Server up and running on port ${PORT}`));

io.on('connection', (socket) => {
    console.info('Nuevo cliente conectado, id:', socket.id)
    // socket.emit('UPDATE_')
})