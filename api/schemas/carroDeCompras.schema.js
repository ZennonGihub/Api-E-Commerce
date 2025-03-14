const joi = require('joi')

const cartId = joi.string().integer();
const userId = joi.string().alphanum().min(3).max(10).required();
const amount = joi.string().integer().min(1).required();
const productId = joi.number().integer().required();
const cartItemId = joi.number().integer().required();

const addItemCarroSchema = joi.object({
  userId: userId.required(),
  productId: productId.required(),
  amount: amount.required()
})

//const deleteItemCarro = joi.object({
//  userId: userId.required(),
//  productId: productId.required(),
//  amount: amount.required()
//})

const updateItemSchema = Joi.object({
  cartItemId: cartItemId.required(),
  cantidad: cantidad.required(),
  productId: productId.required()
});


module.exports = {updateItemSchema, addItemCarroSchema}
