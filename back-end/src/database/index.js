const mysql = require("mysql2/promise");

const connect = mysql.createPool({
  host: "localhost",
  database: "tasklist",
  password: "",
  user: "root",
});

export default connect;
