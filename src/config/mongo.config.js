import mongoose from 'mongoose'
const uri = process.env.MONGODB_URI

mongoose.set('strictQuery', false);

const mongoosePromise = mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource:"admin",
    ssl: true
}, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to mongodb atlas");
    }
});

const AuthorSchema = new mongoose.Schema({
    _id: { type: String, require: true },
    email: { type: String, require: true },
    nombre: { type: String, require: true },
    apellido: { type: String, require: true }, 
    edad: { type: Number, require: true },
    alias: { type: String, require: true },
    avatar: {type: String, require: true}
})

const MessageSchema = new mongoose.Schema({
    author: { type: AuthorSchema, require: true  },
    text: { type: String, require: true },
    _id: {type: String, require: true, max: 50}
}, { versionKey: false })

export default MessageSchema