const { Pool } = require('pg');
const config = require('../config/config').config;
require('dotenv').config();

console.log('CONFIG:', config);


const USER = encodeURIComponent(config.DbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

const pool = new Pool({ connectionString: URI });

module.exports = pool;
