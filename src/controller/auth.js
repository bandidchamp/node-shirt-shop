var mysql = require('./connection')


module.exports = async function(
  username,
  password
) {
  const conn = await mysql.connection()
  var query = `
    SELECT * FROM user WHERE user.user_username LIKE "%${username}%" AND user.user_username LIKE "%${password}%"
  `
  const [result] = await conn.query(query)
  conn.end();
  return result
}