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

const CartSchema = new mongoose.Schema({
    _id: {type: String, require: true, max: 50},
    timestamp: {type: Number, require: true},
    products: {type: Array}
}, { versionKey: false })

const ProductSchema = new mongoose.Schema({
    title: {type: String, require: true, max: 50},
    desc: {type: String, require: true, max: 255},
    codigo: {type: Number, require: true},
    price: {type: Number, require: true},
    thumbnail: {type: String, require: true, max: 255},
    stock: {type: Number, require: true},
    timestamp: {type: Number, require: true},
    _id: {type: String, require: true, max: 50}
}, { versionKey: false })

export { ProductSchema, CartSchema } 