//hardcoded song ID
var songID = "3rgsDhGHZxZ9sB9DQWQfuf";

//Hacky iFrame that is inserted on click with hardcoded song ID. Song ID can be updated on user input.
var iFrame = "<iframe id='song1' src= 'https://open.spotify.com/embed?uri=spotify:user:spotify:playlist:" + songID + "' width='100%' height='100%' frameborder='0' allowtransparency='true'></iframe>";

var songInput = $("#songInput");

//Image that is placed into holder on click. 
var moodImage = "<img src=assets/images/newspinnerhappy.png>";

var currentSongValence = "";

//This appends a hardcoded iframe with a set song.
$(document).ready(function() {
    $("#happyButton").click(function() {
        $("#appendHere").empty().append(iFrame);
        $("#moodImage").empty().append(moodImage);
        $("#currentSongValence").empty().append("Current Song Valence: " + currentSongValence);
        $("#someOtherStat").append("Some other stuff:" + otherStat1);
        $("#someOtherStat2").append("More stuff" + otherStat2);
    });
});

//This appends a hardcoded iframe with a set song.
$(document).ready(function() {
    $("#enter_text").keypress(function(e) {
        if (e.which == 13) { //Enter key pressed
            $("#appendHere").empty().append(iFrame);
            $("#moodImage").empty().append(moodImage);
            $("#currentSongValence").empty().append("Current Song Valence: " + currentSongValence);
            $("#someOtherStat").append("Some other stuff:" + otherStat1);
            $("#someOtherStat2").append("More stuff" + otherStat2);
        };
    })
});


// var cookies = document.cookie.split(";");
// if (cookies.length > 0) {
//     $("#logOutButton").classlist.add('hide');
//     $("#enter_text").classlist.add('hide');
// }

function deleteAllCookies() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++)
        deleteCookie(cookies[i].split("=")[0]);
}

function setCookie(name, value, expirydays) {
    var d = new Date();
    d.setTime(d.getTime() + (expirydays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + "; " + expires;
}

function deleteCookie(name) {
    setCookie(name, "", -1);
}