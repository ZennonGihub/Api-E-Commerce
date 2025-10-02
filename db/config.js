const { config } = require('../config/config');

const USER = encodeURIComponent(config.DbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = config.url;
console.log('CONEXION DB', URI);

module.exports = {
  development: {
    url: URI,
    dialect: 'postgres',
  },
  production: {
    url: URI,
    dialect: 'postgres',
  },
};
