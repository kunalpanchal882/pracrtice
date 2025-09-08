const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username:String,
    password:String
})

const userAuth = mongoose.model('userAuth',userSchema,"userAuths")

module.exports = userAuth