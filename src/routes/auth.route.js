const express = require('express')
const {registerController,logInConroller} = require('../controllers/auth.controller')

const routes = express.Router()

routes.post('/register',registerController)
routes.post('/login',logInConroller)

module.exports = routes