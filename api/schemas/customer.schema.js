const joi = require('joi')

const phone = joi.string();
const name = joi.string().min(3).max(15);
const lastName = joi.string().min(3).max(15);
const id = joi.number().integer();

const getCustomerSchema = joi.object({
  id: id.required()
})

const updateCustomerSchema = joi.object({
  name,
  lastName,
  phone
})

const createCustomerSchema = joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
})

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema }
