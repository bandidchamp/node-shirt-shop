var mysql = require('./connection')


module.exports = async function(
  order_id
) {
  const conn = await mysql.connection()
  var query = `
    SELECT * 

    FROM order_item 
    
      LEFT JOIN product AS product
        ON order_item.order_item_product_id = product.product_id

    WHERE 1=1 

  `
  var query_length = `
    SELECT 

      COUNT(*) AS LENGTH

    FROM order_item 

    WHERE 1=1 

  `
  if (order_id !== undefined && order_id !== null && order_id !== ""){
    query += `AND order_id = ${order_id} `
    query_length += `AND order_id = ${order_id} `
  }
  const [result] = await conn.query(query)
  const [length] = await conn.query(query_length)
  conn.end();
  return {
    result: result,
    length: length
  }
}