const { allow, extend } = require('joi');
const { types } = require('pg');
const { Model, DataTypes, Sequelize} = require('sequelize');
const sequelize = require('../../libs/sequelize');

const CUSTOMER_TABLE = 'customers';

const customerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name'
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING
  },
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: sequelize.NOW
  }
}

class Customers extends Model {
  static associations(models){
    this.belongsTo(models.User, {as:'user'});
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      ModelName: 'customer',
      timestamps: false
    }
    }
}


module.exports = { Customers, CUSTOMER_TABLE, customerSchema}
