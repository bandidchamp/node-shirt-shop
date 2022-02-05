var mysql = require('./connection')


module.exports = async function(
  offset,
  limit,
  status,
  user_id,
  start_time,
  stop_time,
) {
  const conn = await mysql.connection()
  var query = `
    SELECT 

      od.order_id,
      od.order_datetime,
      od.order_status,
      ods.order_status_status,
      od.order_addr,
      uaddr.addr_address,
      od.order_user_id,
      user.user_name,
      user.user_surname

    FROM \`shirt-shop\`.order AS od

      LEFT JOIN order_status AS ods
        ON od.order_status = ods.order_status_id
        
      LEFT JOIN user_address AS uaddr
        ON od.order_addr = uaddr.addr_id

      LEFT JOIN user AS user
        ON od.order_user_id = user.user_id

    WHERE 1=1 

  `
  var query_length = `
    SELECT 

      COUNT(*) AS LENGTH

    FROM \`shirt-shop\`.order AS od

    WHERE 1=1 

  `
  if (user_id !== undefined && user_id !== null && user_id !== ""){
    query += `AND order_user_id = ${user_id} `
    query_length += `AND order_user_id = ${user_id} `
  }
  if (start_time !== undefined && start_time !== null && start_time !== "" && stop_time !== undefined && stop_time !== null && stop_time !== ""){
    query += `AND order_datetime BETWEEN '${start_time}' AND '${stop_time}' `
    query_length += `AND order_datetime BETWEEN '${start_time}' AND '${stop_time}' `
  }
  if (status !== undefined && status !== null && status !== ""){
    query += `AND order_status = ${status} `
    query_length += `AND order_status = ${status} `
  }
  if (limit !== undefined && offset !== undefined){
    query += `
      LIMIT ${conn.escape(parseInt(limit))} OFFSET ${conn.escape(parseInt(offset))}
    `
  }
  const [result] = await conn.query(query)
  const [length] = await conn.query(query_length)
  conn.end();
  return {
    result: result,
    length: length
  }
}