var router = require('express').Router();
var auth = require('../../auth')

var list_addr = require("../../../controller/list_useraddr")

router.get('/',auth.required ,async function(req, res, next) {
  if ((req.payload.exp - req.payload.iat) < 0){
    return res.status(401).json({errors: {message: "Token is expired."}});
  }
  var id = req.payload.id
  const result = await list_addr(id)
  return res.status(200).json({msg: result})
})

module.exports = router;