var router = require('express').Router();

// var connection = require('src/function/connection')
var connection = require('./../../../controller/connection')

router.get('/', async function(req, res, next) {
  const conn = await connection.connection()
  console.log(conn)
  return res.status(200).json({msg: "hello world"})
})

module.exports = router;