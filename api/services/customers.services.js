const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt');

class CustomerService {
  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.user.password, 10);
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hash,
      },
    };
    const newCustomer = await models.Customer.create(newData, {
      include: [
        {
          model: models.User,
          as: 'user',
        },
      ],
    });
    delete newCustomer.user.dataValues.password;
    return newCustomer;
  }

  async find() {
    const customer = await models.Customer.findAll({
      include: [
        {
          model: models.User,
          as: 'user',
        },
      ],
    });
    return customer;
  }

  async findOne(id) {
    const user = await models.Customer.findByPk(id);
    if (!user) {
      throw boom.notFound('customer not found');
    }
    return user;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    return rta;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { rta: true };
  }
}
module.exports = CustomerService;
