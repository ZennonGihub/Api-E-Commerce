const { User, UserSchema } = require('./user.model');
const { Customers, customerSchema} = require('./customer.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customers.init(customerSchema, Customers.config(sequelize));
}

module.exports =  setupModels
