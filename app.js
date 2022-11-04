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

app.use('/', indexRouter)
app.get('/', (req,res) =>{
    res.redirect('/productos')
})

app.use(errorMiddleware)

module.exports = app;