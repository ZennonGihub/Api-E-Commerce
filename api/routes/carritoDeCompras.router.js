const express = require('express')
const validatorHandler = require('../middlewares/validator.handler')
const {updateItemSchema, addItemSchema}= require('./../schemas/carroDeCompras.schema');
const CartUsers = require('./../services/carroDeCompras.services');
const boom = require('@hapi/boom')

const router = express.Router();
const service = new CartUsers();

router.get('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const cart = await service.getCart(userId);
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.post('/agregar',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const newItem = await service.addItem(req.body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
})

router.put('/cambiarCarro/:cartItemId', validatorHandler(updateItemSchema, 'body'),
async (req, res, next) =>   async (req, res, next) => {
  try {
    const { cartItemId } = req.params;
    const updatedItem = await service.updateItem(cartItemId, req.body.cantidad);
    res.json(updatedItem);
  } catch (error) {
    next(error);
  }
}
);

router.delete('/remove/:cartItemId', async (req, res, next) => {
  try {
    const { cartItemId } = req.params;
    const result = await service.removeItem(cartItemId);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
