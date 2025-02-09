const { Client } = require('pg')

async function getConnection() {
  const client = new Client({
    host: 'localhost',
    port: '5432',
    user: 'Zennon',
    password: '102426',
    database: 'E-COOMERCE'
  });

  await client.connect();
  return client
};

module.exports = getConnection;
