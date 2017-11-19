
var express = require("express");

var router = express.Router();
var db = require("../models/");
var spotifyRouter = require("./spotify_controller.js");
var trackName = "Hello";

router.get("/", function(req, res) {
  res.redirect("/moodmusic");
});

router.get("/moodmusic", function(req, res) {
  spotifyRouter.spotifyThisSong(trackName, function(cb) {
    console.log("Callback from spotify: ", cb);
  });

  //console.log("hello world:", song);
// console.log("Valence me:", spotifyRouter.body.valence);

  db.Burger.findAll()
    .then(function(dbBurger) {
      console.log(dbBurger);
      var hbsObject = { burger: dbBurger };
      return res.render("index", hbsObject);
    });
});

router.get("/recentsong", function(req, res) {
res.render("recentsong");

});


router.post("/moodmusic/create", function(req, res) {
  db.Burger.create({
    burger_name: req.body.burger_name
  })
  .then(function(dbBurger) {
    console.log(dbBurger);
    res.redirect("/");
  });
});

router.put("/moodmusic/update", function(req, res) {
  db.Burger.update({
    devoured: true
  },
    {
      where: {
        id: req.body.burger_id
      }
    }
  ).then(function(dbBurger) {
    res.redirect("/");
  });
});

module.exports = router;
