const mysql = require("mysql2/promise");
const bluebird = require("bluebird");

const connect = mysql.createPool({
  host: "localhost",
  database: "tasklist",
  password: "",
  user: "root",
  Promise: bluebird,
});

export default connect;
