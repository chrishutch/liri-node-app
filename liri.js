require("dotenv").config();

var Spotify = require('node-spotify-api');

var keys = require("./key.js");

var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

var command = process.argv[3];
var song = process.argv[2];
if (command === "spotify-this-song"){

 
	spotify.search({ type: 'track', query: song, limit: 1 }, function(err, data) {
  		if (err) {
    		return console.log('Error occurred: ' + err);
  		}
  		
  		for(var i = 0; i < data.tracks.items[0]["album"]["artists"].length; i++) {
  			console.log(data.tracks.items[0]["album"]["artists"][i].name)
  			console.log("======================")
  		}
	});
}