require('dotenv').config();
const { Sequelize } = require('sequelize');
const { config } = require('../config/config')
const setupModels = require('../db/models/index')

console.log('CONFIG:', config);


const USER = encodeURIComponent(config.DbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
console.log('Database URI:', URI);

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: true,
});

setupModels(sequelize)

sequelize.sync();

module.exports = { sequelize };
