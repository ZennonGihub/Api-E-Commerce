const { Pool } = require('pg');

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "zennon",
  password: "root123",
  database: "SanLuis"
});

async function getConnection() {
  return pool;
}
module.exports = { getConnection };
