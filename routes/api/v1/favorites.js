var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
var Favorite = require('../../../models').Favorite;
var pry = require('pryjs');
const fetch = require('node-fetch');


router.post("/", function(req, res, next) {
  User.findOne({
    where: {
      "api_key": req.body.api_key
    }
  })
  .then(user => {
    if (user) {
      return Favorite.create({
        location: req.body.location,
        user_id: user.id
      })
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(400).send(JSON.stringify({"error": "Invalid Api Key"}));
    }
  })
  .then((favorite) => {
    res.setHeader("Content-Type", "application/json");
    res.status(201).send(JSON.stringify({"message": favorite.location + " has been added to your favorites."}));
  })
  .catch((error)=> {
    res.setHeader("Content-Type", "application/json");
    res.status(500).send({ error });
  })
})

router.get("/", function(req, res, next) {
  User.findOne({
    where: {
      "api_key": req.body.api_key
    }
  })
  .then(user => {
    if (user) {
      return Favorite.findAll({
        where: {
          user_id: user.id,
        },
        attributes: ['user_id', 'location']
      })
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(401).send(JSON.stringify({"error": "Invalid Api Key"}));
    }
  })
  .then((favorites) => {
    return  JSON.stringify(favorites)
  })
  // .then((result)=> result)
  .then ( async (favInjson) => {
    var  favoritesArray = JSON.parse(favInjson);
    for (var i=0; i<favoritesArray.length; i++){
	    let forecast = await getForecast(favoritesArray[i]["location"])
	    favoritesArray[i].forecast = forecast;
      return favoritesArray
	  }
  })
  .then((result) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(result);
  })
  .catch((error)=> {
    res.setHeader("Content-Type", "application/json");
    res.status(500).send({ error });
  })
})



 const getForecast = async (location)=> {
  var url = new URL("https://maps.googleapis.com/maps/api/geocode/json"),
  params = {address: location, key: process.env.GEOCODING_API}
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

  const newData = await  mainFetch(url);
  let lat = newData["results"][0]["geometry"]["location"]["lat"]
  let lon = newData["results"][0]["geometry"]["location"]["lng"]
  var url1 = "https://api.darksky.net/forecast/" + process.env.DARK_SKY_API_KEY + "/" + lat + "," + lon
  return await  mainFetch(url1);



  // fetch(url)
  // .then((response) => response.json())
  // .then((result)=>  {
  //   let lat = result["results"][0]["geometry"]["location"]["lat"]
  //   let lon = result["results"][0]["geometry"]["location"]["lng"]
  //
  //
  //   return fetch("https://api.darksky.net/forecast/" + process.env.DARK_SKY_API_KEY + "/" + lat + "," + lon)
  //   .then((response) => response.json())
  //   .then((result) => {
  //
  //     let forecast = _forecastFormatter(result, location);
  //     return Promise.all(forecast)
  //     // res.setHeader("Content-Type", "application/json");
  //     // res.status(201).send(JSON.stringify(forecast));
  //   })
  // })
}

function _forecastFormatter(result, location) {
  return {
    "location": location,
    "currently": result["currently"],
    "hourly": result["hourly"],
    "daily": result["daily"]
  }
}

const mainFetch = async (url) => {
  try{
    const response = await fetch(url)
    return await response.json()
  }catch(error){
    throw new Error(error.message)
  }
}


module.exports = router;
