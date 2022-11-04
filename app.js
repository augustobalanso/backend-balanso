const express = require('express')
const indexRouter = require('./src/routes/index')
const errorMiddleware = require('./src/middlewares/errorHandler')
const logger = require('morgan')

require('dotenv').config();

const app = express();

app.set('views', './views');
app.set('view engine', 'pug')

app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use(logger('dev'))

app.get('/', (_req,res) => {
    res.render('index')
})

app.use(errorMiddleware)

module.exports = app;