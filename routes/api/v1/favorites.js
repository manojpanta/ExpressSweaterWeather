var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
var Favorite = require('../../../models').Favorite;
var pry = require('pryjs');

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
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(favorites));
  })
  .catch((error)=> {
    res.setHeader("Content-Type", "application/json");
    res.status(500).send({ error });
  })
})

module.exports = router;
