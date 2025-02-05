const express = require('express')

const productsRouter = require('./products');
const informacionRouter = require('./informacion')
const usuarioRouter = require('./usuarios');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router)
  router.use('/Articulos', productsRouter)
  router.use('/SanLuis', informacionRouter)
  router.use('/Usuarios', usuarioRouter)
}

module.exports = routerApi
