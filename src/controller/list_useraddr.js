var mysql = require('./connection')


module.exports = async function(
  id,
) {
  const conn = await mysql.connection()
  var query = `
    SELECT * FROM user_address WHERE addr_user_id = ${id}
  `
  const [result] = await conn.query(query)
  conn.end();
  return result
}