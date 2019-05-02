var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
const fetch = require('node-fetch');
var pry = require('pryjs');
require('dotenv').config();
router.get("/", function(req, res, next) {
  var lat = '';
  var lon = '';
  fetch("https://maps.googleapis.com/maps/api/geocode/json?address=denver&key=" + process.env.GEOCODING_API)
  .then((response) => response.json())
  .then((result)=> {
    lat = result["results"][0]["geometry"]["location"]["lat"]
    lon = result["results"][0]["geometry"]["location"]["lon"]
  });
});

module.exports = router;
