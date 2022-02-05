var router = require('express').Router();
var auth = require('../../auth')

var set_addr = require("../../../controller/set_useraddr")

router.put('/',auth.required, async function(req, res, next) {
  if ((req.payload.exp - req.payload.iat) < 0){
    return res.status(401).json({errors: {message: "Token is expired."}});
  }
  var user_id = req.payload.id
  const result = await set_addr(user_id, req.body.address)
  return res.status(200).json({address_id: result.insertId})
})

module.exports = router;