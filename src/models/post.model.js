const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    image:String,
    caption:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"authUsers"
    }
}, { timestamps: true })

const postModel = mongoose.model("userPost",postSchema,"userPosts")

module.exports = postModel