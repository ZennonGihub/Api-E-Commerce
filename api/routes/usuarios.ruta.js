const express = require('express')
const { faker } = require('@faker-js/faker')
const UserServices = require('./../services/usuarios.services')
const validatorHandler = require('./../middlewares/validator.handler')
const { createUser, updateUser, getUser } = require('./../schemas/usuarios.schema')

const router = express.Router();
const service = new UserServices();



router.get('/registter', (req, res) => {
  res.json([{
    const { name, gmail, password} = req.body;
    if (!name || !gmail !! password) {
      req.status(400).json({ message: 'Campos obligatorios'})
    }
  }]
 )
})

router.get('/Login', (req, res) => {
  res.json([{

  }])
})

module.exports = router;
