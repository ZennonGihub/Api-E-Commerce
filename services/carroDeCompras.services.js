const boom = require('@hapi/boom')
const {models} = require('./../libs/sequelize')

class cartUsers {
  constructor() {}

  async getUserCart(userId) {
    const cart = await models.cart.findAll
    return cart
  }

  async addItemCart(data) {
    const {userId, cartId, ItemId} = data;
    const cartItem = await models.cart.findOne()
    if(cartItem) {
      cartItem.amount += amount
      await cartItem.save();
      return cartItem;
    }
    const newItem = await models.Cart.create({ userId, productId, cantidad });
    return newItem;
  }

  async uptadeItem(cartItemId, amount) {
    const cartItem = await models.Cart.findByPk(cartItemId);
    if (!cartItem) {
      throw boom.notFound('Item del carrito no encontrado');
    }
    if(cartItem){
    cartItem.cantidad = cantidad;
    await cartItem.save();
    return cartItem;
  }
}

    async removeItem(cartItemId) {
      const cartItem = await models.Cart.findByPk(cartItemId);
      if (!cartItem) throw boom.notFound('Item del carrito no encontrado');
      await cartItem.destroy();
      return { message: 'Producto eliminado del carrito' };
}


}
module.exports = cartUsers;
