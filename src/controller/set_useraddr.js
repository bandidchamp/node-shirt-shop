var mysql = require('./connection')


module.exports = async function(
  user_id,
  address
) {
  const conn = await mysql.connection()
  var query = `
    INSERT INTO user_address
    (
      addr_address,
      addr_user_id
    )
    VALUES 
    (
      "${address}",
      ${user_id}
    )
  `
  const [result] = await conn.query(query)
  conn.end();
  return result
}