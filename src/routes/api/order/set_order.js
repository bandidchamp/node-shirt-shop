var router = require('express').Router();
var auth = require('./../../auth')

var set_order = require("../../../controller/set_order")

router.put('/',auth.required,  async function(req, res, next) {
  if ((req.payload.exp - req.payload.iat) < 0){
    return res.status(401).json({errors: {message: "Token is expired."}});
  }
  var user_id = req.payload.id
  var address_id = req.body.address_id
  var product = req.body.product
  if (user_id === null || user_id === undefined || user_id === ""){
    return res.status(400).json({errors: {message: "missing user_id."}});
  }
  if (address_id === null || address_id === undefined || address_id === ""){
    return res.status(400).json({errors: {message: "missing address_id."}});
  }
  if (product === null || product === undefined || product.length === 0){
    return res.status(400).json({errors: {message: "missing product."}});
  }
  const result = await set_order(
    user_id,
    address_id,
    product,
  )
  return res.status(200).json('')
})

module.exports = router;