const joi = require('joi')

const id = joi.string().uuid();
const name = joi.string().alphanum().min(3).max(10);
const fechaDeCreacion = joi.number().integer();
const password = joi.password().alphanum()


const createUser = joi.object({
  name: name.required(),
  id: id.required(),
  password: password.required()
});

const updateUser = joi.object({
  name: name,
  id: id,
  password: password
});

const getUser = joi.object({
  id: id.required()
});


module.exports = { createUser, updateUser, getUser }
