// Solution 1: Sequelize the burger assignment
// ===========================================

// This solutions adds sequelize functionality to Burger
// This is the minimum required work for students

// Step 1: Deleted the models, db, and config folder

// Step 2: `Ran sequelize init:config & sequelize init:models` in the command line to initalize the project

// Step 2: Edited the new config.json file to accomodate our database connection

// Step 3: Made a burger model with a burger_name attribute of type DataTypes.String, and a devoured attribute of type
// DataTypes.Boolean. Set devoured to have a defaultValue of false

// Step 5: Removed any reference to the old ORM in burgers_controller

// Step 6: Utilized Sequelize ORM methods in place of the deleted ORM functions
//         in burgers_controller.js
var keys = require("./config/keys.js"); // Grab data from keys.js
let express = require("express");
let bodyParser = require("body-parser");
let methodOverride = require("method-override");
let passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
// bring in the models
let db = require("./models");

let app = express();
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + "/public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
let exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

let routes = require("./controllers/moodmusic_controller.js");

app.use("/", routes);
app.use("/update", routes);
app.use("/create", routes);


// listen on port 3000
let port = process.env.PORT || 3000;
db.sequelize.sync().then(function() {

console.log('clientID, clientSecret', keys.spotifyKeys.client_id, keys.spotifyKeys.client_secret);

passport.use(new SpotifyStrategy({
    clientID: keys.spotifyKeys.client_id,
    clientSecret: keys.spotifyKeys.client_secret,
    callbackURL: "https://moodmusic1.herokuapp.com/auth/spotify/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ spotifyId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));
  app.listen(port);
});


console.log(module.exports);
