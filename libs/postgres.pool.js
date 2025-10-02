const { Pool } = require('pg');
const { config } = require('../config/').config;
require('dotenv').config();

const URI = config.url;

if (!URI) {
  console.error(`Variable URI NO definida`);
}
console.log('CONEXION DB (postgres.pool)', URI);

const pool = new Pool({ connectionString: URI });

module.exports = pool;
