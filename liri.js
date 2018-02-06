var request = require("dotenv").config();

var key = require("./key.js");

var command = process.agrv[2];

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function(error, response, body) {

  // If there were no errors and the response code was 200 (i.e. the request was successful)...
  if (!error && response.statusCode === 200) {

    // Then we print out the imdbRating
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
  }
});
if (command === "spotify-this-song"){
	console.log("works");
}