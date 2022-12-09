import express from "express"
import logger from "morgan"
import dotenv from "dotenv"
import indexRouter from "./src/router/index.js"

dotenv.config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended : true }))

app.use(logger('dev'))

app.use('/', indexRouter)

export default app
