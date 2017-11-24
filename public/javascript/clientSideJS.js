var songID = "3rgsDhGHZxZ9sB9DQWQfuf";
var iFrame = "<iframe id='song1' src= 'https://open.spotify.com/embed?uri=spotify:user:spotify:playlist:" + songID + "' width='100%' height='100%' frameborder='0' allowtransparency='true'></iframe>";
var songInput = $("#songInput");

console.log(songID);

//This appends a hardcoded iframe with a set song.
$(document).ready(function() {
    $("#source_one").click(function() {
        $("#appendHere").empty().append(iFrame);
    });
});
