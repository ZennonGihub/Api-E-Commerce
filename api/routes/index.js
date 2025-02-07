const express = require('express')

const productsRouter = require('./products');
const informacionRouter = require('./informacion')
const usuarioRouter = require('./usuarios');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router)
  router.use('/articulos', productsRouter)
  router.use('/sanLuis', informacionRouter)
  router.use('/usuarios', usuarioRouter)
}

module.exports = routerApi
