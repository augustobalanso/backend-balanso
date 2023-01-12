import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    _id: { type: String, require: true },
    email: { type: String, require: true },
    nombre: { type: String, require: true },
    apellido: { type: String, require: true }, 
    edad: { type: Number, require: true },
    alias: { type: String, require: true },
    avatar: {type: String, require: true},
    password: {type: String, require: true}
}, {versionKey: false})

export default UserSchema