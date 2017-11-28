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

var songList = [];


//This appends a hardcoded iframe with a set song.
$(document).ready(function() {
    $("#happyButton").click(function() {
        songID = "5fXRPS1tp70DbqsBZVyG4e"; //Happy by Rolling Stones
        moodImage = "<img src=assets/images/newspinnerhappy.png>"; 
        iFrame = "<iframe id='song1' src='https://open.spotify.com/embed/track/" + songID + "' width='100%' height='100%' frameborder='0' allowtransparency='true'></iframe>";
        $("#appendHere").empty().append(iFrame);
        $("#moodImage")
            .empty().append(moodImage);
        $("#songInfo").empty();
        //     .empty().append("<ul><li><br>Happy song name: " + songName + "</li>")
        //     .append("<li><br>Happy valence: " + currentSongValence + "</li>")
        //     .append("<li><br>Happy song duration (ms): " + duration + "</li>")
        //     .append("<li><br>Happy ID from user: " + userId + "</li>");
        $("#userImg").empty();
        //     .empty().append("<img src=" + userImg + ">");
    }); //end click
});

//This appends an iframe with a song.
$(document).ready(function() {
    $("#analyzeMe").click(function() {
        moodImage = setMoodImage(currentSongValence);
        console.log("currentSongValence: ", currentSongValence);
        console.log("moodImage: ", moodImage);
        iFrame = "<iframe id='song1' src='https://open.spotify.com/embed/track/" + songID + "' width='100%' height='100%' frameborder='0' allowtransparency='true'></iframe>";
        $("#appendHere").empty().append(iFrame);
        $("#moodImage")
            .empty().append(moodImage);
        $("#songInfo")
            .empty().append("<li>Song name: " + songName + "</li><br>")
            .append("<li>Valence: " + currentSongValence + "</li><br>")
            .append("<li>Duration (ms): " + duration + "</li><br>")
            .append("<li>User Id: " + userId + "</li>");
        $("#userImg")
            .empty().append("<img src=" + userImg + ">");
    }) //end keypress
});

function setMoodImage(value) {
    if (currentSongValence <=0.45) {
        moodImage = "<img src=assets/images/newspinnersad.png>";
    } else if (currentSongValence >=0.55) {
        moodImage = "<img src=assets/images/newspinnerhappy.png>";
    } else {
        moodImage = "<img src=assets/images/newspinnerneutral.png>";
    }
    return moodImage;
}

$('#navBar').click(function() {
    $(this).hide();
});

// var cookies = document.cookie.split(";");
// if (cookies.length > 0) {
//     console.log("cookies: ", cookies);
//     $("#logInButton").hide();
//     $("#enter_text").classlist.add('hide');
// };

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

// name parameters below are 'strings'
function deleteAllSession() {
    // Clear sessionStorage
    sessionStorage.clear();
    var cookies = document.cookie.split(";");
}

function setSession(name, value) {
    sessionStorage.setItem(name, value);
}

function deleteSession(name) {
    sessionStorage.removeItem(name);
}

function logOut() {
      
}

function logIn() {
    
}

function toggleLogIn() {
    if (sessionStorage.getItem("loggedIn") === true) {
        sessionStorage.setItem("loggedIn", false);
        console.log("Logged Out");
    } else{
        sessionStorage.setItem("loggedIn", true);
        console.log("Logged In");
    }   
}

// Function for retrieving users and getting them ready to be rendered to the page
function getUser() {
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

function createSongRow() {

}

// Function for retrieving songs and getting them ready to be rendered to the page
function getSongs() {
    $.get("/api/currentsongs", function(data) {
        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) {
             //rowsToAdd.push(createSongRow(data[i]));
             rowsToAdd.push(data[i]);
        }
        // renderAuthorList(rowsToAdd);
        // nameInput.val("");
        console.log("Songs: ", data);
        // currentSongValence = data[0].valence;
        // songID = data[0].songId;
        // songName = data[0].song_name;
        // duration = data[0].duration;
        songList = data;
    });
}

// Main
// Getting the intiial list of Authors
getUser();
getSong();
getSongs();
