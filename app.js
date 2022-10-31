const express = require('express')
const indexRouter = require('./src/routes/index')
// const errorMiddleware = require('./src/middlewares/errorHandler')
require('dotenv').config();

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended : true }))

app.use('/api', indexRouter)
app.use('/', (_req,res) => {
    res.sendFile(__dirname + '/index.html')
})
// app.use(errorMiddleware)

module.exports = app;