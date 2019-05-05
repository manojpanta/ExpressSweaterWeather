var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
const fetch = require('node-fetch');
var pry = require('pryjs');
require('dotenv').config();
var getForecast = require('../../../models').getForecast;

router.get("/", function(req, res, next) {
  if (req.body.api_key) {
    User.findOne({
      where: {
        "api_key": req.body.api_key
      }
    })
    .then(user => {
      if (user) {
        var location = req.query.location
        var forecast;
        new Promise(function(resolve, reject) {
          forecast = getForecast(location);
          resolve(forecast)
        })
        .then((result)=> {
          res.setHeader("Content-Type", "application/json");
          res.status(200).send(JSON.stringify({"forecast": result}));
        })
        .catch((error) => {
          res.setHeader("Content-Type", "application/json");
          res.status(401).send(JSON.stringify(error));
        })
      } else {
        res.setHeader("Content-Type", "application/json");
        res.status(401).send(JSON.stringify({"error": "Invalid Api Key || API key  must present"}));
      }
    })
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send(JSON.stringify({"error": "Invalid Api Key || API key must present"}));
  }
});
module.exports = router;
