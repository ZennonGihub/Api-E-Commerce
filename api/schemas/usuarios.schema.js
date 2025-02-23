const joi = require('joi')

const id = joi.string().uuid();
const userName = joi.string().alphanum().min(3).max(10);
const password = joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))

const createUser = joi.object({
  userName: userName.required(),
  id: id.required(),
  password: password.required()
});

const updateUser = joi.object({
  userName: userName,
  password: password
});

const getUser = joi.object({
  id: id.required(),
  userName: userName
});

async function validateUserName(userName) {
  const user = await User.findOne({ userName }); // Consulta si el usuario ya existe
  if (user) {
    throw new Error('Username already exists');
  }
}


module.exports = { createUser, updateUser, getUser }

