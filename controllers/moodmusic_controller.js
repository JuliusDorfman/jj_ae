
var express = require("express");

var router = express.Router();
var db = require("../models/");

router.get("/", function(req, res) {
  res.redirect("/moodmusic");
});

router.get("/moodmusic", function(req, res) {
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
