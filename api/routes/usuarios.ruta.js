const express = require('express')
const { faker } = require('@faker-js/faker')
const UserServices = require('./../services/usuarios.services')
const validatorHandler = require('./../middlewares/validator.handler')
const { createUser, updateUser, getUser } = require('./../schemas/usuarios.schema')

const router = express.Router();
const service = new UserServices();

router.get('./', async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users)
  } catch (error) {
    next(error)
  }
})

router.post('/register', (req, res) => {
  const { name, gmail, password} = req.body;
  if (!name || !gmail || !password) {
    res.status(400).json({ message: 'Campos obligatorios'})
  };
   res.json({

  });
})

router.get('/Login', (req, res) => {
  res.json([{

  }])
})

module.exports = router;
