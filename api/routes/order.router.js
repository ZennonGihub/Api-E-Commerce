const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const boom = require('@hapi/boom');
const { getOrderSchema, createOrderSchema, addItemSchema } = require('./../schemas/order.schema')
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
    const newOrder = await service.create(body)
    res.status(201).json(newOrder)
  } catch (error) {
    next(error)
  }
});

router.post('/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
  try {
    const body = req.body;
    const newItem = await service.addItem(body)
    res.status(201).json(newItem)
  } catch (error) {
    next(error)
  }
});

module.exports = router;
