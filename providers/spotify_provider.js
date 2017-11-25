var keys = require("../config/keys.js"); // Grab data from keys.js
var Spotify = require("node-spotify-api"); // node package that handles Spotify requests
var request = require("request"); // node package for making http requests
// var express = require("express");
var querystring = require('querystring');
// var cookieParser = require('cookie-parser');

var spotify = new Spotify({
    id: keys.spotifyKeys.client_id,
    secret: keys.spotifyKeys.client_secret,
    redirect_uri: keys.spotifyKeys.redirect_uri
});

// var userSong = {};

var spotifyProvider = {
    userSong: {},

    token: null,

    getLogin: function(state) {
        var scope = 'user-read-private user-read-email';
        return 'https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: keys.spotifyKeys.client_id,
                scope: scope,
                redirect_uri: keys.spotifyKeys.redirect_uri,
                state: state
            });
    }, // end getLogin

    authenticate: function(code, cb) {
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: keys.spotifyKeys.redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(keys.spotifyKeys.client_id + ':' + keys.spotifyKeys.client_secret).toString('base64'))
            },
            json: true
        }; //end AuthOptions

        request.post(authOptions, function(error, response, body) {
            if (!error && response.statusCode === 200) {

                var access_token = body.access_token,
                    refresh_token = body.refresh_token;

                var options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    json: true
                };

                // use the access token to access the Spotify Web API
                request.get(options, function(error, response, body) {
                    // @TODO for Alan to take the body info and put into the DB
                    // Please add 'id', 'image', 'email' and 'name'
                    console.log("-------------");
                    console.log("User Data from Spotify:", body);
                });

                this.token = access_token;

                // we can also pass the token to the browser to make requests from there
                // res.redirect('/#' +
                //   querystring.stringify({
                //     access_token: access_token,
                //     refresh_token: refresh_token
                //   }));
                cb(null, {
                    access_token: access_token,
                    refresh_token: refresh_token
                });
            } else {
                // res.redirect('/#' +
                //   querystring.stringify({
                //     error: 'invalid_token'
                //   }));
                cb(error, {
                    error: 'invalid_token'
                });
            }
        }); //end post authOptions
    }, //end authenticate

    // refresh: function(token, cb) {
    //     var authOptions = {
    //         url: 'https://accounts.spotify.com/api/token',
    //         headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    //         form: {
    //             grant_type: 'refresh_token',
    //             refresh_token: token
    //         },
    //         json: true
    //     };

    //     request.post(authOptions, function(error, response, body) {
    //         if (!error && response.statusCode === 200) {
    //             this.spotifyRouter.token = body.access_token;
    //             cb(null, { 'access_token': body.access_token });
    //         } else {
    //             cb(error, { 'error': 'failed to refresh token.' });
    //         }
    //     });
    // }, //end refresh

    //@TODO write tests for this
    spotifyThisSong: function(trackName, cb, token) {
        spotify.search({ type: 'track', query: trackName, limit: 5 }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            var firstResult = data.tracks.items[0];
            var songIdNum = firstResult.id;
            var oaToken = token;
            var albumName = data.tracks.items[0].album.name;
            var artist = data.tracks.items[0].album.artists[0].name;
            var options = {
                method: 'GET',
                url: 'https://api.spotify.com/v1/audio-features/' + songIdNum,
                headers: {
                    'cache-control': 'no-cache',
                    authorization: 'Bearer ' + oaToken,
                    'content-type': 'application/json'
                },
                json: true
            };

            request(options, function(error, response, body) {
                if (error) throw new Error(error);
                spotifyProvider.userSong.song_name = firstResult.name;
                spotifyProvider.userSong.artist = artist;
                spotifyProvider.userSong.album = albumName;
                spotifyProvider.userSong.valence = body.valence;
                spotifyProvider.userSong.liveness = body.liveness;
                spotifyProvider.userSong.energy = body.energy;
                spotifyProvider.userSong.songId = songIdNum;
                spotifyProvider.userSong.duration_ms = firstResult.duration_ms;
                console.log('songObject', spotifyProvider.userSong);
                cb(spotifyProvider.userSong);
            }); //end request Spotify info

            var trackInfo = "* Track Title: " + firstResult.name +
                "* Artist(s): " + firstResult.album.artists[0].name +
                "* Preview Link: " + firstResult.external_urls.spotify +
                "* Album Name: " + firstResult.album.name +
                "* Song ID: " + songIdNum;

            var dataArr = trackInfo.split("*");

            for (i = 0; i < dataArr.length; i++) {
                console.log(dataArr[i].trim());
            }
        }); //end search
        return this;
    } //end spotifyThisSong
}; //end function

module.exports = spotifyProvider;