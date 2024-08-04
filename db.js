const { Pool } = require('pg');

// Create a pool using your PostgreSQL configuration
const pool = new Pool({
  user: 'fintech',         // replace with your PostgreSQL user
  host: 'localhost',        // replace with your PostgreSQL host
  database: 'fintechdatabase', // replace with your PostgreSQL database name
  password: 'fintechuser', // replace with your PostgreSQL password
  port: 5432,               // default PostgreSQL port
});

module.exports = pool;
