var mysql = require('mysql2/promise');

const connection = () => {
  var connection = mysql.createConnection({
    host: process.env.MYSQL_HOST_DEV,
    user: process.env.MYSQL_ROOT,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    timezone: "Z"
  });

  return connection
}

module.exports = {
  connection
};