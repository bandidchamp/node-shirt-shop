var mysql = require('./connection')


module.exports = async function(
  size,
  catagory,
  gender,
  limit,
  offset
) {
  const conn = await mysql.connection()
  var query = `
    SELECT 
      product.product_id,
      product.product_name,
      product.product_catagory,
      ppc.product_catagory_name,
      product.product_size,
      pps.product_size_name,
      product.product_gender,
      ppg.product_gender_name,
      product.product_price,
      product.product_quantity 
      
    FROM product AS product 

    LEFT JOIN product_catagory AS ppc
      ON product.product_catagory = ppc.product_catagory_id
    LEFT JOIN product_size AS pps
      ON product.product_size = pps.product_size_id
    LEFT JOIN product_gender AS ppg
      ON product.product_gender = ppg.product_gender_id

    WHERE 1=1 
  `
  var query_length = `
    SELECT COUNT(*) AS LENGTH FROM product AS product WHERE 1=1 
  `
  if (size !== undefined && size !== null && size !== ""){
    query += `AND product.product_size = ${size} `
    query_length += `AND product.product_size = ${size} `
  }
  if (catagory !== undefined && catagory !== null && catagory !== ""){
    query += `AND product.product_catagory = ${catagory} `
    query_length += `AND product.product_catagory = ${catagory} `
  }
  if (gender !== undefined && gender !== null && gender !== ""){
    query += `AND product.product_gender = ${gender} `
    query_length += `AND product.product_gender = ${gender} `
  }
  const [length] = await conn.query(query_length)
  if (limit !== undefined && offset !== undefined){
    query += `
      LIMIT ${conn.escape(parseInt(limit))} OFFSET ${conn.escape(parseInt(offset))}
    `
  }
  const [result] = await conn.query(query)
  conn.end();
  return {
    result: result,
    length: length
  }
}