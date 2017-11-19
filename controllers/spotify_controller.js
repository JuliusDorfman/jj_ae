var keys = require("../config/keys.js"); // Grab data from keys.js
var request = require("request"); // node package for making http requests
var Spotify = require("node-spotify-api"); // node package that handles Spotify requests

//Prompts for command line syntax
// var action = process.argv[2];
// var value = process.argv[3];
// Then run a request to the Spotify API with the track title specified
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
            var oaToken = 'BQAgKgsEfVqBuTNWXUJA4fwndLpFPmr2OFPuuQZtchJL-orpOzf4v_WvPEo2YbWfv_ZNG-47HW3iKHU791GSKg2WhjSnv3ryPUdktanCyepdlXoYjo_dh9Q1FAneOkuNpAHeKawwS5_6aH0cu1E4';

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

                console.log("Valence:", body);
                console.log("SongId: ", songId);
                cb(body.valence);
            });

            console.log(firstResult);
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