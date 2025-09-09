const express = require('express')
const connectToDb = require('./db/db')
const authRoute = require('./routes/auth.route')
const cookieParser = require('cookie-parser')
const postRoute = require('./routes/post.route')

const app = express()
app.use(express.json())
connectToDb()
app.use(cookieParser())

app.use('/auth',authRoute)
app.use('/post',postRoute)

module.exports = app