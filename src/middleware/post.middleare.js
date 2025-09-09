const jwt = require('jsonwebtoken')
const userModel = require('../models/auth.model')

async function createPostMiddleware(req,res,next){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"unauthorized user please login"
        })
    }

   try {
     
    const decode = jwt.verify(token,process.env.JWT_SECRATE)

    console.log(decode);
    
    const user = await userModel.findOne({
        _id:decode.id
    })

    // req.user = user

   } catch (error) {
    return res.status(401).json({
        message:"invalid token please login",
        error
    })
   }

   next()
}

module.exports = createPostMiddleware