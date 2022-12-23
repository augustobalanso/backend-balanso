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