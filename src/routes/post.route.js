const express = require('express')
const {createPostController} = require('../controllers/post.controller')
const createPostMiddleware= require('../middleware/post.middleare')
const route = express.Router()

route.post('/',createPostMiddleware,createPostController)

module.exports = route