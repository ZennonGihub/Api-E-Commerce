const joi = require('joi')

const phone = joi.string();
const name = joi.string().min(3).max(15);
const lastName = joi.string().min(3).max(15);
const email = joi.string().email();
const id = joi.number().integer();
const userId = joi.number().integer();
const password = joi.string();


const getCustomerSchema = joi.object({
  id: id.required()
})

const updateCustomerSchema = joi.object({
  name,
  lastName,
  phone,
  userId
})

const createCustomerSchema = joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: joi.object({
    password: password.required(),
    email: email.required()
  })
})

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema }
