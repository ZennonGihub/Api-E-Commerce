const express = require('express')

const articulosRouter = require('./articulos.ruta');
const pagosRouter = require('./pagosRouter.router')
const usuarioRouter = require('./usuarios.ruta');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router)
  router.use('/articulos', articulosRouter)
  router.use('/pagos', pagosRouter)
  router.use('/usuarios', usuarioRouter)
}

module.exports = routerApi
