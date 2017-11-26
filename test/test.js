var expect = require("chai").expect;
var spotifyProvider = require("../providers/spotify_provider.js");
var auth_token = "BQB7SlJJKz0YpgZWnH38oRib6IJb0vo1uurMzLiM_jTt9_k1cOdH8UBZfUGTYgdJ4Q9QQTjiqcmtmil6f875_SmhYoUv56Md9AlZxGQcIPwR2rqvOBOLuNi3z0sYsSnJDmILPGYOgTmDFC9PL8WocWU";


describe("Spotify", function() {
    it("should produce a query with the proper client_id and redirect_uri", function() {
        expect(spotifyProvider.getLogin("hello1234")).to.equal("https://accounts.spotify.com/authorize?response_type=code&client_id=52b4253865e24076a3bbb8838d4ce261&scope=user-read-private%20user-read-email&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&state=hello1234&show_dialog=true");
    });

    it("should respond with an object", function() {
        expect(spotifyProvider.spotifyThisSong("Hello", null, auth_token)).to.be.an('object');
    });

});