const mongoose = require('mongoose')

async function connectToDb(){
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connect to db");
        
    } catch (error) {
        console.log("could not connect to db",error);  
    }
}

module.exports = connectToDb