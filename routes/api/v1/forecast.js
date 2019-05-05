var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
const fetch = require('node-fetch');
var pry = require('pryjs');
require('dotenv').config();


router.get("/", function(req, res, next) {
  var location = req.query.location
  getForecast(location, req, res, next);
});

function getForecast(location, req, res, next) {

  var url = new URL("https://maps.googleapis.com/maps/api/geocode/json"),
  params = {address: location, key: process.env.GEOCODING_API}
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

  fetch(url)
  .then((response) => response.json())
  .then((result)=>  {
    let lat = result["results"][0]["geometry"]["location"]["lat"]
    let lon = result["results"][0]["geometry"]["location"]["lng"]
    return fetch("https://api.darksky.net/forecast/" + process.env.DARK_SKY_API_KEY + "/" + lat + "," + lon)
    .then((response) => response.json())
    .then((result) => {
      let forecast = _forecastFormatter(result, location);
      res.setHeader("Content-Type", "application/json");
      res.status(201).send(JSON.stringify(forecast));
    })
  })
}




function _forecastFormatter(result, location) {
  return {
    "location": location,
    "currently": result["currently"],
    "hourly": result["hourly"],
    "daily": result["daily"]
  }
}

module.exports = router;
