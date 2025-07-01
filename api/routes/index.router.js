const express = require('express');

const articulosRouter = require('./articulos.router');
const carritoDeCompras = require('./carritoDeCompras.router');
const usuarioRouter = require('./usuarios.router');
const customeRouter = require('./customer.router');
const categoriesRouter = require('./categories.router');
const orderRouter = require('./order.router');
const authRouter = require('./auth.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', articulosRouter);
  router.use('/carro', carritoDeCompras);
  router.use('/users', usuarioRouter);
  router.use('/customer', customeRouter);
  router.use('/categories', categoriesRouter);
  router.use('/order', orderRouter);
  router.use('/auth', authRouter);
}
module.exports = routerApi;
