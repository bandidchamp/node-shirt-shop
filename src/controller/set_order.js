var mysql = require('./connection')
var parseDateTime = require('../common/parseDateTime')

module.exports = async function(
  user_id,
  address,
  product,
) {
  const conn = await mysql.connection()
  var query_insert_order = `
  INSERT INTO \`shirt-shop\`.order
  (
    order_status,
    order_user_id,
    order_addr,
    order_datetime
  )
  VALUES
    (
      1,
      ${user_id},
      ${address},
      '${parseDateTime(new Date())}'
    )
  `
  console.log(query_insert_order)
  const [result_insert_order] = await conn.query(query_insert_order)
  const inserted_order = result_insert_order.insertId
  var query_insert_order_item = `
    INSERT INTO order_item
    (
      order_item_quantity,
      order_item_product_id,
      order_id
    )
    VALUES 
    ${product.map((e, i) => `
      ( ${e.quantity}, ${e.product}, ${inserted_order}) 
    `)}
  `
  await conn.query(query_insert_order_item)
  conn.end();
  return ''
}