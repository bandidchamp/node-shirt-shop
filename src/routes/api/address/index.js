var router = require('express').Router();

router.use("/address", require("./get_addr"))
router.use("/address", require("./set_addr"))

router.use(function(err, req, res, next){
  if(err.name === 'ValidationError'){
    return res.status(400).json({
      errors: Object.keys(err.errors).reduce(function(errors, key){
        errors[key] = err.errors[key].message;
        return errors;
      }, {})
    });
  }

  return next(err);
});

module.exports = router;