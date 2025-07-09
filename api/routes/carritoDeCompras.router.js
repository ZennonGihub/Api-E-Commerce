const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const {
  updateItemSchema,
  addItemSchema,
} = require('./../schemas/carroDeCompras.schema');
const CartUsers = require('./../services/carroDeCompras.services');
const passport = require('passport');
const boom = require('@hapi/boom');
const { checkRoles } = require('../middlewares/auth.handler');

const router = express.Router();
const service = new CartUsers();

router.get(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller', 'user'),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = req.user;
      if (user.role !== 'admin' && user.sub.toString() !== userId) {
        throw boom.forbidden('No tienes permisos para realizar esa accion');
      }
      const cart = await service.getCart(userId);
      res.status(200).json(cart);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/agregar',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller', 'user'),
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const newItem = await service.addItem(req.body);
      const user = req.user;
      if (user.role !== 'admin' && user.sub.toString() !== id) {
        throw boom.forbidden('No tienes permisos para realizar esa accion');
      }
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/cambiarCarro/:cartItemId',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller', 'user'),
  validatorHandler(updateItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const { cartItemId } = req.params;
      const updatedItem = await service.updateItem(
        cartItemId,
        req.body.cantidad
      );
      const user = req.user;
      if (user.role !== 'admin' && user.sub.toString() !== id) {
        throw boom.forbidden('No tienes permisos para realizar esa accion');
      }
      res.status(200).json(updatedItem);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/remove/:cartItemId',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller', 'user'),
  async (req, res, next) => {
    try {
      const { cartItemId } = req.params;
      const result = await service.removeItem(cartItemId);
      const user = req.user;
      if (user.role !== 'admin' && user.sub.toString() !== id) {
        throw boom.forbidden('No tienes permisos para realizar esa accion');
      }
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
