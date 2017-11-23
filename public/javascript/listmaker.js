$.ajax({
    url: queryURL,
    method: "GET",
    dataType: 'json',
}).done(function(response) {
    console.log(response);
   
$("#moodimage").prepend('<img id="unicorn" src="assets/images/uni.jpg">');

	$('#theDiv').prepend('<img id="theImg" src="theImg.png" />')
