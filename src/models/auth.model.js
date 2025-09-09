const mongoose = require('mongoose')

const authUserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const userModel = mongoose.model('authUser',authUserSchema,"authUsers")

module.exports = userModel