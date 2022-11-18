const express = require('express');
const indexRouter = require('./src/routes/index')
const errorMiddleware = require('./src/middleware/errorHandler')
const logger = require('morgan')

require('dotenv').config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use(express.static(__dirname + '/public'));

app.use(logger('dev'))

app.use('/api', indexRouter)
app.use(errorMiddleware)

module.exports = app
