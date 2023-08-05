const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'macdov',
  password: 'roo1pOkF2J37',
  database: 'letterboxd',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the database.');
  }
});

module.exports = connection;
