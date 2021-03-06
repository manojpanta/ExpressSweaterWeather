var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const crypto = require('crypto');
//authentication packages
var session = require('express-session');
var pry = require('pryjs');
require('dotenv').config();


router.post("/", function(req, res, next) {
  if (req.body.password == req.body.password_confirmation) {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
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
    });
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({"error": "password did not match"}));
  }
});

module.exports = router;
