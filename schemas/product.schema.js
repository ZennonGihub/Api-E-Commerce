const joi = require('joi')

const id = joi.string().uuid();
const name = joi.string().alphanum().min(3).max(10);
const price = joi.number().integer();


const createProduct = joi.object({
  name: name.required(),
  price: price.required()
});

const updateProduct = joi.object({
  name: name,
  price: price
});

const getProduct = joi.object({
  id: id.required()
});


module.exports = { createProduct, updateProduct, getProduct }
