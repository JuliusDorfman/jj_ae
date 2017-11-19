$.ajax({
    url: queryURL,
    method: "GET",
    dataType: 'json',
}).done(function(response) {
    console.log(response);
   