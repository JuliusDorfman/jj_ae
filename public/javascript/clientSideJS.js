//hardcoded song ID
var songID = "aaa";

//Hacky iFrame that is inserted on click with hardcoded song ID. Song ID can be updated on user input.
var iFrame = "sss";

var songInput = $("#songInput");

//Image that is placed into holder on click. 
var moodImage = "<img src=assets/images/newspinnerhappy.png>";

var currentSongValence = "";
var songName = "";
var duration = "";

var userId = "";
var userImg = "";


//This appends a hardcoded iframe with a set song.
$(document).ready(function() {
    $("#happyButton").click(function() {
        songID = "5fXRPS1tp70DbqsBZVyG4e"; //Happy by Rolling Stones
        iFrame = "<iframe src='https://open.spotify.com/embed/track/" + songID + "' width='300' height='380' frameborder='0' allowtransparency='true'></iframe>";
        $("#appendHere").empty().append(iFrame);
        $("#moodImage")
            .empty().append("Happy moodImg: " + moodImage);
        $("#songInfo")
            .empty().append("<ul><li><br>Happy song name: " + songName + "</li>")
            .append("<li><br>Happy valence: " + currentSongValence + "</li>")
            .append("<li><br>Happy song duration (ms): " + duration + "</li>")
            .append("<li><br>Happy ID from user: " + userId + "</li>");
        $("#userImg")
            .empty().append("<img src=" + userImg + ">");
    });
});

//This appends a hardcoded iframe with a set song.
$(document).ready(function() {
    $("#enter_text").keypress(function(e) {
        if (e.which == 13) { //Enter key pressed
            // $("#appendHere").empty().append(iFrame);
            // $("#moodImage").empty().append(moodImage);
            // $("#currentSongValence").empty().append("Current Song Valence: " + currentSongValence);
            // $("#someOtherStat").append("Some other stuff:" + data[0].id_name);
            // $("#someOtherStat2").append("More stuff" + data[0].id_name);
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

// Function for retrieving users and getting them ready to be rendered to the page
function getUser() {
    console.log("hi user");
    $.get("/api/currentuser", function(data) {
        // var rowsToAdd = [];
        // for (var i = 0; i < data.length; i++) {
        //     rowsToAdd.push(createAuthorRow(data[i]));
        // }
        // renderAuthorList(rowsToAdd);
        // nameInput.val("");
        console.log("User properties: ", data);
        userId = data[0].id_name;
        userImg = data[0].image;
    });
}

// Function for retrieving songs and getting them ready to be rendered to the page
function getSong() {
    console.log("hi song");
    $.get("/api/currentsong", function(data) {
        // var rowsToAdd = [];
        // for (var i = 0; i < data.length; i++) {
        //     rowsToAdd.push(createAuthorRow(data[i]));
        // }
        // renderAuthorList(rowsToAdd);
        // nameInput.val("");
        console.log("Song properties: ", data);
        currentSongValence = data[0].valence;
        songID = data[0].songId;
        songName = data[0].song_name;
        duration = data[0].duration;
    });
}

// Main
// Getting the intiial list of Authors
getUser();
getSong();