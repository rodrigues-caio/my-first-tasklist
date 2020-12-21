const mysql = require('mysql2/promise');

const connect = mysql.createPool({
  host: 'localhost',
  port: 3307,
  database: 'tasklist',
  password: '',
  user: 'root',
});

module.exports = connect;
