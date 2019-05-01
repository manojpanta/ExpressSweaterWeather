var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
router.post("/", function(req, res, next) {
  if (req.body.password == req.body.password_confirmation) {
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
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
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({"error": "password did not match"}));
  }
});

module.exports = router;
