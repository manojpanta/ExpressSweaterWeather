var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
const bcrypt = require('bcrypt');
const saltRounds = 10;
router.post("/", function(req, res, next) {
    User.findOne({
      where: {
        "email": req.body.email
      }
    })
    .then(user => {
      bcrypt.compare(req.body.password, user.password, function(err, result) {
        if (result == true ){
          res.setHeader("Content-Type", "application/json");
          res.status(201).send(JSON.stringify({"api_key": user.api_key}));
        } else{
          res.setHeader("Content-Type", "application/json");
          res.status(401).send(JSON.stringify({"error": "Request could not be authorized."}));
        }
      })
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error });
    });
});

module.exports = router;
