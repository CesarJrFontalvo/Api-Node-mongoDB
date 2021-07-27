const express = require('express')

const userCtrl = require('../controllers/user')

const api = express.Router()



api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)

module.exports = api