const { Pool } = require('pg');

const pool = new Pool({
  host: "localhost", // Usa "postgres" si tu backend está dentro de Docker
  port: 5432,
  user: "zennon",
  password: "root123",
  database: "SanLuis"
});

pool.query('SELECT 1', (err, res) => {
  if (err) {
    console.error("❌ Error de conexión:", err);
  } else {
    console.log("✅ Conexión exitosa a PostgreSQL");
  }
  pool.end();
});
