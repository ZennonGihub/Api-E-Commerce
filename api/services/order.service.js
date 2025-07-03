const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class OrderService {
  constructor() {}

  async create(data) {
    const customer = await models.Customer.findOne({
      where: { userId: data },
    });
    console.log(customer);
    if (!customer) {
      throw boom.badRequest('Usuario no encontrado');
    }
    const newOrder = await models.Order.create({
      customerId: customer.id,
    });
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async find() {
    return [];
  }

  async findByUser(userId) {
    const customer = await models.Customer.findOne({
      where: { userId: userId },
    });
    console.log(customer);
    if (!customer) {
      return [];
    }
    const orders = await models.Order.findAll({
      where: {
        customerId: customer.id,
      },
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items',
      ],
    });
    return orders;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = OrderService;
