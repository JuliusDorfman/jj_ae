//hardcoded song ID
var songID = "3rgsDhGHZxZ9sB9DQWQfuf";

//Hacky iFrame that is inserted on click with hardcoded song ID. Song ID can be updated on user input.
var iFrame = "<iframe id='song1' src= 'https://open.spotify.com/embed?uri=spotify:user:spotify:playlist:" + songID + "' width='100%' height='100%' frameborder='0' allowtransparency='true'></iframe>";

//
var songInput = $("#songInput");

//Image that is placed into holder on click. 
var moodImage = "<img src=assets/images/magic.png>";





console.log(songID);

//This appends a hardcoded iframe with a set song.
$(document).ready(function() {
    $("#source_one").click(function() {
        $("#appendHere").empty().append(iFrame);
        $("#moodImage").empty().append(moodImage);
        $("#currentSongValence").append(".80");
        $("#someOtherStat").append("Some other shit");
        $("#someOtherStat2").append("More shit");
    });
});
