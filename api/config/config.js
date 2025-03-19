require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  DbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT || 5432,
  apiKey: process.env.API_KEY
};

module.exports = { config };
