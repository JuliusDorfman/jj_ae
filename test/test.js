var expect = require("chai").expect;
var spotifyProvider = require("../providers/spotify_provider.js");


describe("Spotify", function() {
  it("should produce a query with the proper client_id and redirect_uri", function() {
    expect(spotifyProvider.getLogin("hello1234")).to.equal("https://accounts.spotify.com/authorize?response_type=code&client_id=52b4253865e24076a3bbb8838d4ce261&scope=user-read-private%20user-read-email&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&state=hello1234");
  });

  it("should do something", function() {
    expect(spotifyProvider.spotifyThisSong("Hello", null, "BQBKGC927iEnAqziF7GkFnHGYrlhy7QI90Lgt8gEHSKnsOFUUkwoezcENJ9HjwItpSGvg0rGE0GLhPouWx5Q8QIib16buQ4QeoTot9S6OXZCm-yUG7N7vEDdY5585LAlsw2Eng-efWy5o9v5V0Ye")).to.be.an('object');
  });

});