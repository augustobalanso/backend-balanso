const express = require('express');
const {Server: HttpServer} = require('http');
const {Server: IoServer} = require('socket.io');
const indexRouter = require('./src/routes/index');
const errorMiddleware = require('./src/middlewares/errorHandler');

require('dotenv').config();

const app = express();

app.set('views', './views');
app.set('view engine', 'pug')

// app.use(express.json())
// app.use(express.urlencoded({ extended : true }))
app.use(express.static(__dirname + '/views'));
// app.use(logger('dev'))

app.use('/', indexRouter)
app.get('/', (req,res) =>{
    res.redirect('/productos')
})

app.use(errorMiddleware)

const http = new HttpServer(app)
const io = new IoServer(http, {
    cors: {
        origin: "https://backend-balanso-2dacursada-production.up.railway.app/productos"
    }
})

module.exports = {
    http: http,
    io: io
};