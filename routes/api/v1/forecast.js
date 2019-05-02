var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
const fetch = require('node-fetch');
var pry = require('pryjs');
require('dotenv').config();

router.get("/", function(req, res, next) {
  var location = req.query.location
  fetch("https://maps.googleapis.com/maps/api/geocode/json?address=denver&key=" + process.env.GEOCODING_API)
  .then((response) => response.json())
  .then((result)=>  {
    let lat = result["results"][0]["geometry"]["location"]["lat"]
    let lon = result["results"][0]["geometry"]["location"]["lng"]
    return fetch("https://api.darksky.net/forecast/" + process.env.DARK_SKY_API_KEY + "/" + lat + "," + lon)
    .then((response) => response.json())
    .then((result) => {
      let forecast = {
        "location": location,
        "currently": result["currently"],
        "hourly": result["hourly"],
        "daily": result["daily"]
      }
      res.send((forecast))
    })
  })
});

module.exports = router;
