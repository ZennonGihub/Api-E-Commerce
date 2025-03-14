const express = require('express')

const articulosRouter = require('./articulos.router');
const carritoDeCompras = require('./carritoDeCompras.router')
const usuarioRouter = require('./usuarios.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router)
  router.use('/articulos', articulosRouter)
  router.use('/carro', carritoDeCompras)
  router.use('/usuarios', usuarioRouter)
}

module.exports = routerApi
