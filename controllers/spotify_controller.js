var keys = require("../config/keys.js"); // Grab data from keys.js
var request = require("request"); // node package for making http requests
var Spotify = require("node-spotify-api"); // node package that handles Spotify requests

var spotify = new Spotify({
    id: keys.spotifyKeys.client_id,
    secret: keys.spotifyKeys.client_secret
});


function Song(song_name, valence, liveliness, energy, duration) {
    this.song_name = song_name,
        this.valence = valence,
        this.liveliness = liveliness,
        this.energy = energy,
        this.duration = duration
}

//Spotify Exercise
var spotifyRouter = {
    spotifyThisSong: function(trackName = "Happy McFarren", cb) {

        spotify.search({ type: 'track', query: trackName, limit: 5 }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            var firstResult = data.tracks.items[0];
            var songIdNum = firstResult.id;
            var oaToken = 'BQCOOs17vXUnXORt6eocvABkyV6SmwTQjEb4ba42lAz005RlJbevTWvRPYbseO_ySIlphBV_Tc8XEBcvoNPkzPjmNyhoOcl5hsUR65DV_GbwE5vm_xnGlnDXJQ1YSNTr8uPOXBVjTUY';

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

                var song_name = firstResult.name
                var valence = body.valence;
                var liveness = body.liveness;
                var energy = body.energy;
                var songId = songId;
                var duration_ms = firstResult.duration_ms;
                console.log('FIRST Result', firstResult.duration_ms);
                var songObject = new Song(
                    song_name,
                    valence,
                    liveness,
                    energy,
                    songId,
                    // TODO: FOR some reason, unable to log the duration in here
                    duration_ms
                )

                console.log('SONG OBJECT', songObject);

                //TODO: Are the console.logs below now redundant?
                console.log("Valence: ", valence);
                console.log("Liveness: ", liveness);
                console.log("Energy: ", energy);
                console.log("SongId: ", songIdNum);
                console.log("Duration in ms: ", firstResult.duration_ms);
                //Todo wrap callback into object - get help!
                cb(body.valence);
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