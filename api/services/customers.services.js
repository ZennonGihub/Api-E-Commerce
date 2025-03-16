const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize')

class CustomerService {
  constructor() {
  }

  async create(data) {
    const newUser = await models.User.create(data.user);
    const newCustomer = await models.Customer.create({
      ...data,
      userId: newUser.id
    });
  const customerWithUser = await models.Customer.findByPk(newCustomer.id, {
    include: ['user']
  });
  return customerWithUser;
}

  async find() {
    const customer = await models.Customer.findAll({
      include: {
        model: models.User,
        as: 'user'
      }
    });
    return customer;
  }


 async findOne(id) {
    if (!id) {
      throw boom.badRequest('El ID proporcionado no es válido');
    }
    const customer = await models.Customer.findByPk(id);
    if(!customer) {
    throw boom.notFound('Customer not found')
    }
    return customer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const rta = await customer.update(changes);
    return rta;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy()
    return { rta: true };
}
}
module.exports = CustomerService;
