var router = require('express').Router();
var auth = require('./../../auth')

var list_order_item = require('./../../../controller/list_order_item')

router.get('/item', auth.required,  async function(req, res, next) {
  if ((req.payload.exp - req.payload.iat) < 0){
    return res.status(401).json({errors: {message: "Token is expired."}});
  }


  var order_id = req.query.order_id
  
  try {
    var result = await list_order_item(
      order_id
    )
    return res.status(200).json({
      timestamp: new Date(),
      status: 200,
      length: result.length[0].LENGTH,
      payload: result.result,
      path:req.originalUrl
    })
  } catch (e) {
    return res.status(500).json({
      timestamp: new Date(),
      status: 500,
      error:"Internal Server Error",
      length: 0,
      payload: e,
      path:req.originalUrl
    })
  }
})

module.exports = router;