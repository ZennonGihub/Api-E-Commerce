const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom')

class UserServices {
  constructor() {
    this.users = [],
    this.generate();
  }

  generate() {
    const users = 20
    for(let i = 0; i < users; i++) {
      this.users.push({
        id: faker.string.uuid(),
        name: faker.string.name(),
      });
    }
  }

  create(data) {
    const newUser = ({
      id: faker.string.uuid(),
      ...data
    });
    this.users.push(newUser)
    return newUser;
  };

  find() {
    return this.users;
  }

  findOne(id) {
   const user = this.users.find(item => item.id === id)
    if(!user) {
       throw boom.notFound ('usuario no encontrado')
     } else if (user.isBlock) {
       throw boom.conflict ('Usuario bloqueado')
     } else {
       return product;
     }
  }

  uptade(id,  changes) {
    const index = this.users.findIndex(item => item.id === id)
    if (index === -1) {
    throw boom.notFound('usuario no encontrado')
    }
    const user = this.users[index]
    this.users[index] = {
      ...user,
      ...changes
    }
    return this.users[index]
  }

  delete(id) {
    const index = this.users.findIndex(item => item.id === id)
    if (index === -1) {
      throw boom.notFound('usuario no encontrado')
    } this.users.splice(index, 1)
    return { id }
  }
}

module.exports = UserServices;
