const joi = require('joi')

const id = joi.number().integer();
const name = joi.string().alphanum().min(3).max(10);
const password = joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'));
const email = joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })

const createUser = joi.object({
  name: name.required(),
  password: password.required(),
  email: email.required()
});

const updateUser = joi.object({
  name: name,
  password: password,
  email: email
});

const getUser = joi.object({
  name: name.required(),
  email: email
});

const deleteUser = joi.object({
  name: name.required(),
  password: password.required(),
  email: email.required()
})


module.exports = { createUser, updateUser, getUser, deleteUser }

