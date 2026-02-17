const mysql = require('mysql2/promise');

let poolConfig;

if (process.env.DATABASE_URL) {
  // Cloud MySQL (Aiven, PlanetScale, etc.) — single connection string
  poolConfig = {
    uri: process.env.DATABASE_URL,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  };
} else {
  // Local development — individual env vars
  poolConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'todo_app',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  };
}

const pool = mysql.createPool(poolConfig);

module.exports = pool;
