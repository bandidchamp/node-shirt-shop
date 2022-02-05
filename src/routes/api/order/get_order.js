var router = require('express').Router();
var auth = require('./../../auth')

var list_order = require('./../../../controller/list_order')

router.get('/',auth.required,  async function(req, res, next) {
  if ((req.payload.exp - req.payload.iat) < 0){
    return res.status(401).json({errors: {message: "Token is expired."}});
  }
  
  if (
    req.query.limit === "" || req.query.limit === null || req.query.limit === undefined ||
    req.query.offset === "" || req.query.offset === null || req.query.offset === undefined
  ){
    return res.status(400).json({
      timestamp: new Date(),
      status: 400,
      error:"missing limit or offset.",
      length: 0,
      payload: "",
      path:req.originalUrl
    })
  }

  var offset = req.query.offset
  var limit = req.query.limit
  var status = req.query.status
  var user_id = req.payload.id
  var start_time = req.query.start_time
  var stop_time = req.query.stop_time
  
  try {
    var result = await list_order(
      offset,
      limit,
      status,
      user_id,
      start_time,
      stop_time,
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