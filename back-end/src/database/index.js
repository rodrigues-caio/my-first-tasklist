import mysql from 'mysql2/promise';

const connect = mysql.createPool({
  host: 'localhost',
  port: 3307,
  database: 'tasklist',
  password: '',
  user: 'root',
});

export default connect;
