const express = require("express")
const userModel = require('../models/user.model')
const route = express.Router()
const jwt = require("jsonwebtoken")



route.post('/register',async(req,res) => {
    const {username,password} = req.body

    const userISAvilable = await userModel.findOne({
        username
    })

    if(userISAvilable){
        return res.status(200).json({
            message:"user is already register"
        })
    }

try {
    
    const user = await userModel.create({
        username,password
    })

    
    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRATE)

    res.cookie('token',token)

    res.status(201).json({
        message:"user register succesfully",
        user
    })
} catch (error) {
    res.status(401).json({
        message:"somthing went wrong",
        error
    })
}

})

route.get('/user',async(req,res) => {
    const{token} = req.cookies

    try {
    const decode = jwt.verify(token,process.env.JWT_SECRATE)

    const user = await userModel.findOne({
        _id:decode.id
    }).select("-password")

    res.status(201).json({
        message:"user fecth sucessfuly",
        user
    })
    } catch (error) {
        res.status(400).json({
            message:"somthing wne wrong",
            error
        })
    }

})

route.post('/login',async(req,res) => {
    const{username,password} = req.body

   try {
     const isUerAvilable = await userModel.findOne({
        username
    })

    if(!username){
        res.status(404).json({
            message:"username is noot avilable"
        })
    }

    const ISPassword = password == isUerAvilable.password

    if(!ISPassword){
        res.status(401).json({
            message:"invalid password",
        })
    }

    const token = jwt.sign({
        id:isUerAvilable.id
    },process.env.JWT_SECRATE)

    res.cookie('token',token)

    res.status(201).json({
        message:"user loged in succesfully",
        isUerAvilable
    })

   } catch (error) {
    res.status(404).json({
        message:"somthing went wrong",
        error
    })
   }


    

})

route.post('/logout',(req,res) => {
    res.clearCookie("token");

    res.status(201).json({
        message:"user logout succesfully",
    })
})

module.exports = route