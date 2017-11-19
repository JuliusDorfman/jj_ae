var keys = require("../config/keys.js"); // Grab data from keys.js
var request = require("request"); // node package for making http requests
var Spotify = require("node-spotify-api"); // node package that handles Spotify requests

var spotify = new Spotify({
    id: keys.spotifyKeys.client_id,
    secret: keys.spotifyKeys.client_secret
});

//Spotify Exercise
var spotifyRouter = {
    spotifyThisSong: function(trackName = "Happy McFarren", cb) {
        
        spotify.search({ type: 'track', query: trackName, limit: 5 }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            var firstResult = data.tracks.items[0];
            var songId = firstResult.id;
            var oaToken = 'BQC8tNZ8MYuU6CzW3RN8_3WaiY2dBcmfiT3Ov456T0fwG2dx_bGZLoQr06SVoRh7TTYSTQ1RQzByeEOEfUBTWNisVLJVROnEz7MNi_j8P5GH850--rNYHAyFiNW2u2JY51-ozotAMP-Z19qO_jN6';

            var options = {
                method: 'GET',
                url: 'https://api.spotify.com/v1/audio-features/' + songId,
                headers: {
                    'cache-control': 'no-cache',
                    authorization: 'Bearer ' + oaToken,
                    'content-type': 'application/json'
                },
                json: true
            };

            request(options, function(error, response, body) {
                if (error) throw new Error(error);

                console.log("Valence: ", body.valence);
                console.log("Liveness: ", body.liveness);
                console.log("Energy: ", body.energy);
                console.log("SongId: ", songId);
                console.log("Duration in ms: ", firstResult.duration_ms);
                //Todo wrap callback into object - get help!
                cb(body.valence);
            });

            // console.log("Initial call Result:", firstResult);
            var trackInfo = "* Track Title: " + firstResult.name +
                "* Artist(s): " + firstResult.album.artists[0].name +
                "* Preview Link: " + firstResult.external_urls.spotify +
                "* Album Name: " + firstResult.album.name +
                "* Song ID: " + songId;
            var dataArr = trackInfo.split("*");
            for (i = 0; i < dataArr.length; i++) {
                console.log(dataArr[i].trim());
            }
            console.log("\n===== log.txt was updated with Music info! =====");

        });
    }
} //End Spotify Exercise

module.exports = spotifyRouter;