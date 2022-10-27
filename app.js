const express = require('express')
const indexRouter = require('./src/routes/index')
require('dotenv').config();

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended : true }))

app.use('/api/productos', indexRouter)

module.exports = app;