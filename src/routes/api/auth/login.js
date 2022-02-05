var router = require('express').Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');

router.post('/login', async function(req, res, next) {

  if(!req.body.username){
    return res.status(400).json({errors: {message: "username can't be blank"}});
  }

  if(!req.body.password){
    return res.status(400).json({errors: {message: "password can't be blank"}});
  }


  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 10);
  var token = jwt.sign({
    id: 0,
    username: req.body.username,
    type: "user",
    exp: parseInt(exp.getTime() / 1000),
  }, "egat-secret");
  return res.status(200).json({status: true, token: token})
  
})

module.exports = router;