const mongoose = require('mongoose')

async function connectToDb(){
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connect to db");
    } catch (error) {
        console.log("db not connected");
        
    }
}

module.exports = connectToDb