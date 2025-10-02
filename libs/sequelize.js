const Sequelize = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('../db/models/index');

const URI = config.url;

if (!URI) {
  console.error(`Variable URI NO definida`);
}
console.log('CONEXION DB (sequelize)', URI);

//const USER = encodeURIComponent(config.DbUser);
//const PASSWORD = encodeURIComponent(config.dbPassword);

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: false,
});

setupModels(sequelize);

module.exports = sequelize;
