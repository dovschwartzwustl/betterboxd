const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'macdov',
  password: 'roo1pOkF2J37',
  database: 'letterboxd',
});

async function connectToDatabase() {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to the database.');
    connection.release(); // Release the connection back to the pool
  } catch (err) {
    console.error('Error connecting to the database:', err.message);
    process.exit(1); // Exit the process with an error code
  }
}

connectToDatabase();
module.exports = pool;