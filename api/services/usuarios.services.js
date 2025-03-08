const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize')

class UserServices {
  constructor() {
  }

  async create(data) {
    const newUser = await models.User.create(data)
    return newUser;
  };

  async find() {
    const rta = await models.User.findAll();
    return rta;
  }


 async findOne(id) {
    const user = await models.User.findByPk(id);
    if(!user) {
    throw boom.notFound('user not found')
    }
    return user;
  }

  async uptade(id,  changes) {
    const user = await this.findOne(id);
    const rta = await user.uptade(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy()
    return { id };
}
}
module.exports = UserServices;
