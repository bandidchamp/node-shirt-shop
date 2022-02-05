var router = require('express').Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');

var login = require('./../../../controller/auth')

router.post('/login', async function(req, res, next) {

  if(!req.body.username){
    return res.status(400).json({errors: {message: "username can't be blank"}});
  }

  if(!req.body.password){
    return res.status(400).json({errors: {message: "password can't be blank"}});
  }

  const result = await login(req.body.username, req.body.password)

  if (result.length === 1){
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 10);
    var token = jwt.sign({
      id: result[0].user_id,
      user_name: result[0].user_name,
      user_surname: result[0].user_surname,
      user_role: result[0].user_role,
      exp: parseInt(exp.getTime() / 1000),
    }, "shirt-shop-secret");
    return res.status(200).json({
      id: result[0].user_id,
      user_name: result[0].user_name,
      user_surname: result[0].user_surname,
      user_role: result[0].user_role,
      access_token: token
    })
  } else {
    return res.status(204).json()
  }
  
})

module.exports = router;