var express = require("express");
var router = express.Router();
var request = require('request');
var db = require("../models/");
var cookieParser = require('cookie-parser');
var querystring = require('querystring');

var spotifyProvider = require("../providers/spotify_provider.js");
var trackName = "Hello";
var songId = "123";

var stateKey = 'spotify_auth_state';

var app = express();

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

app.use(express.static(__dirname + '/public'))
    .use(cookieParser());

app.get('/', function(req, res) {
    res.redirect('/moodmusic');
});


app.get('/login', function(req, res) {
    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    res.redirect(spotifyProvider.getLogin(state));
});

app.get('/callback', function(req, res) {
    // your application requests refresh and access tokens
    // after checking the state parameter
    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        res.clearCookie(stateKey);
        spotifyProvider.authenticate(code, function(err, data) {
            if (!err) {
                // do something if auth was successful
                //spotifyProvider.spotifyThisSong();
                // res.redirect('/#' + querystring.stringify(data));
                res.cookie("access_token", data.access_token);
                res.redirect('/moodmusic');
            } else {
                // do something if there was an error
                res.redirect('/#' + querystring.stringify(data));
            }
        });
    }

});

// app.get('/refresh_token', function(req, res) {
//     spotifyProvider(req.query.refresh_token, function(err, data) {
//         if (!err) {
//             // @TODO: Save access token to cookie or session
//             spotifyProvider.token = 'access_token_from_cookie_or_session';
//             spotifyProvider.spotifyThisSong();
//             res.send(data);
//         } else {
//             res.send(data);
//         }
//     })

// });

// // app.get('/authorize', function(req,res) {
// //   console.log('Authorizing via spotify...');
// //   var URL = "https://accounts.spotify.com/authorize?"
// //           + "client_id=52b4253865e24076a3bbb8838d4ce261"
// //           + "&redirect_uri=http://localhost:3000/callback"
// //           + "&scope=user-read-private%20user-read-email"
// //           + "&response_type=token"
// //           + "&state=123";

// // console.log('URL', URL);

// //   request(URL, function (error, response, body) {
// //     if (error) {
// //       console.log('error:', error); // Print the error if one occurred
// //       res.status(500);
// //       res.end();
// //       return;
// //     }
// //     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
// //     console.log('body:', body); // Print the HTML for the Google homepage.
// //   });
// // });

app.get("/moodmusic", function(req, res) {
    // @TODO: get access_token from cookie
    spotifyProvider.token = req.cookies['access_token'];

    db.Song.findAll({
            where: {
                songId: songId
            }
        })
        .then(function(dbBurger) {
            // console.log("All Songs in DB: ", dbBurger);
            var hbsObject = { song: dbBurger[0] };
            // console.log("Object sent back to UI of all songs: ", hbsObject);
            return res.render("index", hbsObject);
        });
});

app.get("/recentsong", function(req, res) {
    res.render("recentsong");
});

app.post("/moodmusic/create", function(req, res) {
    console.log("Song Name: ", req.body.song_name);
    spotifyProvider.spotifyThisSong(req.body.song_name, function(userSong) {
        console.log("Callback from spotify: ", userSong);
        //create song
        db.Song.create({
                song_name: spotifyProvider.userSong.song_name,
                artist: spotifyProvider.userSong.artist,
                album: spotifyProvider.userSong.album,
                valence: spotifyProvider.userSong.valence,
                liveness: spotifyProvider.userSong.liveness,
                energy: spotifyProvider.userSong.energy,
                songId: spotifyProvider.userSong.songId,
                duration: spotifyProvider.userSong.duration_ms
            })
            // prevent duplicate insert - handle validation error
            .catch((err) => { console.log("Song Error: ", err.message) } )
            .then(function(dbBurger) {
                // console.log("Create: ", dbBurger);
                // res.redirect("/");
                trackName = req.body.song_name;
                songId = spotifyProvider.userSong.songId;
                // res.redirect("/moodmusic");
                // db.Like.create({
                //     duration: spotifyProvider.userSong.duration_ms,
                //     songId: spotifyProvider.userSong.songId,
                //     userId: 1
                //   })
                //   // prevent duplicate insert - handle validation error
                //   .catch((err) => { console.log("Song Error: ", err.message) } )

                res.redirect("/moodmusic");
            });
    }, spotifyProvider.token);
});

app.put("/moodmusic/update", function(req, res) {
    db.Song.update({
        devoured: true
    }, {
        where: {
            id: req.body.song_id
        }
    }).then(function(dbBurger) {
        res.redirect("/");
    });
});

module.exports = app;