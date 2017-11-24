var keys = require("./config/keys.js"); // Grab data from keys.js
let express = require("express");
let bodyParser = require("body-parser");
let methodOverride = require("method-override");
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

//app.use("/", routes);
app.use("/", routes);
app.use("/update", routes);
app.use("/create", routes);

//@TODO add favicon

// listen on port 3000
let port = process.env.PORT || 3000;
db.sequelize.sync().then(function() {

    console.log('clientID, clientSecret', keys.spotifyKeys.client_id, keys.spotifyKeys.client_secret);

    console.log('Listening on ' + port);
    app.listen(port);
});