'use strict'

const User = require('../models/user')
const service = require('../services')


// CREAR USUARIO -----------------
function signUp (req, res) {
  const user = new User({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
    estado: req.body.estado
  })

  user.save((err) => {
    if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}` })
    
    return res.status(201).send({ message: 'ID de usuario creado !!' })
    // return res.status(201).send({ token: service.createToken(user) })
  })
}





// LOGIN Y CREAR EL TOKEN --------------------
function signIn (req, res) {

    User.findOne({ email: req.body.email, password: req.body.password}, (err, user) => {

        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: 'Usuario o password incorrecta' })

        req.user = user
        res.status(200).send({
        message: 'Te has logueado correctamente',
        token: service.createToken(user)
        })
    })
}




// LISTAR TODOS LOS USUARIOS ----------------
function getUsers (req, res) {
    User.find({}, (err, user) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if (!user) return res.status(404).send({message: 'No existen productos'})
  
      res.send(200, { user })
    })
  }





  // SELECCIONAR UN USUARIO ---------------------
  function getUser (req, res) {
    let id = req.params.id
    //let userEstado = req.params.userEstado
    

    User.findById(id, (err, user) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if (!user) return res.status(404).send({message: 'No existen productos'}) 
  
      res.send(200, { user })
    })
  }




// ACTUALIZAR USUARIO ---------------------
function updateUser (req, res) {
    let id = req.params.id
    let update = req.body
    console.log(id)
    console.log(update)
  
    User.findByIdAndUpdate(id, update, { new: true }, (err, userUpdated) => {
      if (err) return res.status(500).send({message: `Error al actualizar el usuario: ${err}`})

      if(!userUpdated) return res.status(500).send({message: 'No retornó objeto actualizado'})
        
      res.status(200).send({ user: userUpdated })
    })
  }





// ELIMINAR USUARIO ----------------------
  function deleteUser (req, res) {
    let id = req.params.id
  
    User.findById(id, (err, user) => {
      if (err) res.status(500).send({message: `Error al borrar el usuario: ${err}`})
  
      user.remove(err => {
        if (err) res.status(500).send({message: `Error al borrar el usuario: ${err}`})
        res.status(200).send({message: 'El usuario ha sido eliminado'})
      })
    })
  }

module.exports = {
  signUp,
  signIn,
  getUsers,
  getUser,
  deleteUser,
  updateUser
}