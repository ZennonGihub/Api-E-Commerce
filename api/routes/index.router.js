const express = require('express')

const productsRouter = require('./products');
const informacionRouter = require('./informacion.ruta')
const usuarioRouter = require('./usuarios.ruta');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router)
  router.use('/articulos', productsRouter)
  router.use('/sanLuis', informacionRouter)
  router.use('/usuarios', usuarioRouter)
}

module.exports = routerApi
