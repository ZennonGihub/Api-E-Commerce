const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom')
const pool = require('../libs/postgres.pool')

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
    this.pool = pool;
  }

  async generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        descripcion: faker.commerce.productDescription(),
        isBlock: faker.datatype.boolean()
      });
    }
  }

  async create(data){
    const newProduct = {
      id: faker.string.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct
  };

  async find() {
    const query = 'SELECT * FROM tasks';
    const rta = await this.pool.query(query);
    return rta.rows;
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id)
    if(!product) {
      throw boom.notFound ('product not found')
    } else if (product.isBlock) {
      throw boom.conflict ('product is block')
    } else {
      return product;
    }
  }

  update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound ('product not found')
    }
    const product = this.products[index]
    this.products[index] = {
      ...product,
      ...changes
    }
    return this.products[index];
  }

  async delete(id, ) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound ('product not found')
    }
    this.products.splice(index, 1);
    return { id }
  }
}

module.exports = ProductsService;
