const express = require('express')



const app = express()

app.get('/',(req,res) => {
    res.send("hello wordl")
})

module.exports = app