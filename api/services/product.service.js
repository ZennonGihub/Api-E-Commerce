const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize');
const { query } = require('express');
const { options } = require('joi');

class ProductsService {
  constructor() {
  }
  async create(data){
    const newProduct = await models.Product.create(data);
    return newProduct
  };

  async find(query) {
    const options = {
    include: ['category'],
    }
    const {limit, offset} = query;
    if(limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }
    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id)
    return product;
  }

  async update(id, changes) {
    const product = this.Product.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    const updatedProduct = Object.assign(product, changes);
    return updatedProduct;
  }

  async delete(id) {
    const index = this.Product.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound ('product not found')
    }
    this.products.splice(index, 1);
    return { id }
  }
}

module.exports = ProductsService;
