const express = require('express')
const ProductsService = require('./../services/product.service')
const validatorHandler = require('./../middlewares/validator.handler')
const { createProduct, updateProduct, getProduct } = require('./../schemas/product.schema')


const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const productos = await service.find();
  res.json(productos)
});


router.get('/iluminacion/:id',
  validatorHandler(getProduct, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product)
      } catch (error) {
      next(error)
    }
 }
);

router.post('/',
  validatorHandler(createProduct, 'body'),
  async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
});

router.patch('/:id',
  validatorHandler(getProduct, 'params'),
  validatorHandler(updateProduct, 'body'),
  async (req, res,) => {
  try {
  const {id} = req.params;
  const body = req.body;
  const product = await service.update(id, body)
  res.json(product);
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', async (req, res) => {
  const {id} = req.params;
  const rta = await service.delete(id)
  res.json(rta);
});

module.exports = router;
