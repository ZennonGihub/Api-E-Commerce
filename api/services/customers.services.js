const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize')

class CustomerService {
  constructor() {
  }

  async create(data) {
    return data
  };

  async find() {
    const user = await models.Customer.findAll();
    return rta;
  }


 async findOne(id) {
    if (!id) {
      throw boom.badRequest('El ID proporcionado no es válido');
    }
    const user = await models.Customer.findByPk(id);
    if(!user) {
    throw boom.notFound('Customer not found')
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy()
    return { rta: true };
}
}
module.exports = CustomerService;
