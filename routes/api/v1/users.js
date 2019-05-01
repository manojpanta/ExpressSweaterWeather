var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
const crypto = require('crypto');

router.post("/", function(req, res, next) {
  User.create({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          api_key: crypto.randomBytes(16).toString('hex')
    })
    .then(user => {
      res.setHeader("Content-Type", "application/json");
      res.status(201).send(JSON.stringify({"api_key": user.api_key}));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error });
    });
});


module.exports = router;
