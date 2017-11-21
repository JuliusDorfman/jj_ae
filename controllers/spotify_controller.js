var keys = require("../config/keys.js"); // Grab data from keys.js
var request = require("request"); // node package for making http requests
var Spotify = require("node-spotify-api"); // node package that handles Spotify requests

var spotify = new Spotify({
    id: keys.spotifyKeys.client_id,
    secret: keys.spotifyKeys.client_secret
});


var userSong = {}

//Spotify Exercise
var spotifyRouter = {
    spotifyThisSong: function(trackName = "Happy McFarren", cb) {

        spotify.search({ type: 'track', query: trackName, limit: 5 }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            var firstResult = data.tracks.items[0];
            var songIdNum = firstResult.id;
            var oaToken = 'BQCqJpKvo6BtJYIjOVcNbu7BXWlDrpsXmbcZel9LCMjjp8W01KvtKAM9q7zw6Nsr8F26Vud8ovuwsUSnY0QROP-PmvW613ta8-JfG7sw1ua7XQOZuEKjpJ07Zz-jos95FVeeby17nDI';
            var albumName = data.tracks.items[0].album.name
            var artist = data.tracks.items[0].album.artists[0].name
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
                userSong.song_name = firstResult.name;
                userSong.artist = artist;
                userSong.album = albumName;
                userSong.valence = body.valence;
                userSong.liveness = body.liveness;
                userSong.energy = body.energy;
                userSong.songId = songIdNum;
                userSong.duration_ms = firstResult.duration_ms;
                console.log('songObject', userSong);
                // artist album 
                //Todo wrap callback into object - get help!
            });

            // console.log("Initial call Result:", firstResult);
            var trackInfo = "* Track Title: " + firstResult.name +
                "* Artist(s): " + firstResult.album.artists[0].name +
                "* Preview Link: " + firstResult.external_urls.spotify +
                "* Album Name: " + firstResult.album.name +
                "* Song ID: " + songIdNum;
            var dataArr = trackInfo.split("*");
            for (i = 0; i < dataArr.length; i++) {
                console.log(dataArr[i].trim());
            }
            console.log("\n===== log.txt was updated with Music info! =====");

        });
    }

} //End Spotify Exercise

module.exports = spotifyRouter;