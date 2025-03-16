const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const boom = require('@hapi/boom');
const { getOrderSchema, createOrderSchema } = require('./../schemas/order.schema')
const OrderService = require('./../services/order.service')

const router = express.Router();
const service = new OrderService;

router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const categoryId = await service.findOne(id);
    res.json(categoryId);
  } catch (error) {
    next(error)
  }
});

router.post('/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
  try {
    const body = req.body;
    res.status(201).json(await service.create(body))
  } catch (error) {
    next(error)
  }
});

module.exports = router;
