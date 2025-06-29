const express = require('express')
const validatorHandler = require('../middlewares/validator.handler')
const {createCustomerSchema,updateCustomerSchema,getCustomerSchema} = require('./../schemas/customer.schema');
const CustomerService = require('./../services/customers.services');

const router = express.Router();
const service = new CustomerService();

router.get('/', async (req, res, next) => {
    try {
      res.json(await service.find());
    } catch (error) {
      next(error)
    }
  });

  router.post('/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
  try {
    const body = req.body;
    res.status(201).json(await service.create(body))
  } catch (error) {
    next(error)
  }
});

router.put('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const {id} = req.params
      const body = req.body
      res.status(201).json(await service.update(id, body))
    } catch (error) {
      next(error)
    }
  }
)

router.delete('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      res.status(201).json(await service.delete(id))
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router;
