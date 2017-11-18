
var express = require("express");
let passport = require('passport');
var router = express.Router();
var request = require('request');
var db = require("../models/");
var spotifyRouter = require("./spotify_controller.js");
var trackName = "Beat It";

router.get("/", function(req, res) {
  res.redirect("/moodmusic");
});

router.get('/authorize', function(req,res) {
  console.log('Authorizing via spotify...');
  var URL = "https://accounts.spotify.com/authorize?"
          + "client_id=49359df6dc324aa0af4c4b5429f2d2b9"
          + "&redirect_uri=https://moodmusic1.herokuapp.com/authenticating"
          + "&scope=user-read-private%20user-read-email"
          + "&response_type=token"
          + "&state=123";

console.log('URL', URL);

  request(URL, function (error, response, body) {
    if (error) {
      console.log('error:', error); // Print the error if one occurred
      res.status(500);
      res.end();
      return;
    }
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  });
});

router.get('/auth/spotify',
  passport.authenticate('spotify'),
  function(req, res){
    // The request will be redirected to spotify for authentication, so this
    // function will not be called.
  });

router.get('/auth/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('req.params, req.query', req.params, req.query);
    res.body = req.query;
    res.render('authenticating', { spotifyAuth: req.query });
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
