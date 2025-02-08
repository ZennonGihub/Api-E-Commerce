const express = require('express')
const { faker } = require('@faker-js/faker')
const UserServices = require('./../services/usuarios.services')
const validatorHandler = require('./../middlewares/validator.handler')

const router = express.Router();

router.get('/registro', (req, res) => {
  res.json([{

  }])
})

router.get('/registro', (req, res) => {
  res.json([{

  }])
})

module.exports = router;
