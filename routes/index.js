'use strict'

const express = require('express')
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')
const api = express.Router()


api.post('/users', userCtrl.signUp)
api.put('/users/:id', auth, userCtrl.updateUser)
api.delete('/users/:id', auth, userCtrl.deleteUser)
api.get('/users', userCtrl.getUsers)
api.get('/users/:id',  userCtrl.getUser)
api.post('/authorization', userCtrl.signIn)



module.exports = api
