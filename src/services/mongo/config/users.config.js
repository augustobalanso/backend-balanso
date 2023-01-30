import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const uri = process.env.MONGODB_USERS_URI

mongoose.set('strictQuery', false);

const mongooseUserConnection = mongoose.createConnection(uri, {
    dbName: 'desafio11',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource:"admin",
    ssl: true
}, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to mongo users db");
    }
});

export default mongooseUserConnection