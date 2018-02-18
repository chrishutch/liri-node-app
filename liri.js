require("dotenv").config();

// * `my-tweets`

// * `spotify-this-song`

// * `movie-this`

// * `do-what-it-says`


var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var omdb = require('omdb');

var keys = require("./key.js");
var fs = require("fs");
var request = require("request");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv;
var liriCommand = command[2];

//In case the command has spaces
var liriArgv = '';
for (var i = 3; i < command.length; i++) {
  liriArgv += command[i] + ' ';
}

if (liriCommand === "spotify-this-song") {
	spotifythis(liriArgv);
}
else if (liriCommand === "movie-this") {
  moviethis(liriArgv);
}
else if (liriCommand === "my-tweets") {
  tweethis();
}
else if (liriCommand === "do-what-it-says") {
  dothis();
}
else {
  fs.appendFile('./log.txt', 'User Command: ' + command + '\n\n', (err) => {
    if (err) throw err;

    var prettyString = 'Usage:\n' + 
           '    node liri.js my-tweets\n' + 
           '    node liri.js spotify-this-song "<song_name>"\n' + 
           '    node liri.js movie-this "<movie_name>"\n' + 
           '    node liri.js do-what-it-says\n';

    // Append the output to the log file
    fs.appendFile('./log.txt', 'LIRI Response:\n\n' + prettyString + '\n', (err) => {
      if (err) throw err;
      console.log(prettyString);
    });
  });
}

function spotifythis(song) {

  fs.appendFile('./log.txt', 'User Command: node liri.js spotify-this-song ' + song + '\n\n', (err) => {
    if (err) throw err;
  });

  // If no song is provided, LIRI defaults to 'The Sign' by Ace Of Base
  var search;
  if (song === '') {
    search = 'The Sign Ace Of Base';
  } else {
    search = song;
  }

  spotify.search({ type: 'track', query: search}, function(error, data) {
      if (error) {
      var errorStr1 = 'ERROR: Retrieving Spotify track -- ' + error;

      // Append the error string to the log file
      fs.appendFile('./log.txt', errorStr1, (err) => {
        if (err) throw err;
        console.log(errorStr1);
      });
      return;
      } else {
      var songInfo = data.tracks.items[0];
      if (!songInfo) {
        var errorStr2 = 'ERROR: No song info retrieved, please check the spelling of the song name!';

        // Append the error string to the log file
        fs.appendFile('./log.txt', errorStr2, (err) => {
          if (err) throw err;
          console.log(errorStr2);
        });
        return;
        } 
        else {
        // Pretty print the song information
        var prettyString = '------------------------\n' + 
                'Song Information:\n' + 
                '------------------------\n\n' + 
                'Song Name: ' + songInfo.name + '\n'+ 
                'Artist: ' + songInfo.artists[0].name + '\n' + 
                'Album: ' + songInfo.album.name + '\n' + 
                'Preview Here: ' + songInfo.preview_url + '\n';

        // Append the output to the log file
        fs.appendFile('./log.txt', 'LIRI Response:\n\n' + prettyString + '\n', (err) => {
          if (err) throw err;
          console.log(prettyString);
        });
      }
      }
  });
}
function moviethis(movie) {
  // Append the command to the log file
  fs.appendFile('./log.txt', 'User Command: node liri.js movie-this ' + movie + '\n\n', (err) => {
    if (err) throw err;
  });

  // If no movie is provided, LIRI defaults to 'Mr. Nobody'
  var search;

  if (movie === '') {
    search = 'Mr. Nobody';
  } 
  else {
    search = movie;
  }

  // Replace spaces with '+' for the query string
  search = search.split(' ').join('+');

  // Construct the query string
  var requestMovie = 'http://www.omdbapi.com/?t=' + search + '&plot=full&tomatoes=true';

  request(requestMovie, function (error, response, body) {

  if (error) {
        return console.log('Error occurred: ' + error);
      }
  if (!error && response.statusCode === 200) {

    console.log("================================================");
    console.log("The movie's title is: " + JSON.parse(body).Title);
    console.log("The movie was made in: " + JSON.parse(body).Year);
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
    console.log("The movie uses these languages:  " + JSON.parse(body).Language);
    console.log("The movie's Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Value);
    console.log("The movie was made in: " + JSON.parse(body).Country);
    console.log("The movie's plot is: " + JSON.parse(body).Plot);
    console.log("The movie's actors are: " + JSON.parse(body).Actors);
    console.log("================================================"); 
    }
    fs.appendFile('./log.txt', 'LIRI Response:\n\n' + prettyString + '\n', (err) => {
          if (err) throw err;
          console.log(prettyString);
        });
  });

}
function tweethis() {
  fs.appendFile('./log.txt', 'User Command: node liri.js my-tweets\n\n', (err) => {
    if (err) throw err;
  });

  var params = {screen_name: 'thewafflehutch', count: 20};

  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (error) {
      var errorStr = 'ERROR: Retrieving user tweets -- ' + error;

      // Append the error string to the log file
      fs.appendFile('./log.txt', errorStr, (err) => {
        if (err) throw err;
        console.log(errorStr);
        });
          return;
        } 
        else {
          // Pretty print user tweets
          var prettyString = '------------------------\n' +
                  'User Tweets:\n' + 
                  '------------------------\n\n';

          for (var i = 0; i < tweets.length; i++) {
            prettyString += 'Created on: ' + tweets[i].created_at + '\n' + 
                   'Tweet content: ' + tweets[i].text + '\n' +
                   '------------------------\n';
          }

          // Append the output to the log file
          fs.appendFile('./log.txt', 'LIRI Response:\n\n' + prettyString + '\n', (err) => {
            if (err) throw err;
            console.log(prettyString);
          });
        }
  });
}

function dothis() {
  // Append the command to the log file
  fs.appendFile('./log.txt', 'User Command: node liri.js do-what-it-says\n\n', (err) => {
    if (err) throw err;
  });

  // Read in the file containing the command
  fs.readFile('./random.txt', 'utf8', function (error, data) {
    if (error) {
      console.log('ERROR: Reading random.txt -- ' + error);
      return;
    } 
    else {
      // Split out the command name and the parameter name
      var commandString = data.split(',');
      var commandLiri = commandString[0].trim();
      var param = commandString[1].trim();

      switch(commandLiri) {
        case 'my-tweets':
          tweethis(); 
          break;

        case 'spotify-this-song':
          spotifythis(param);
          break;

        case 'movie-this':
          moviethis(param);
          break;
      }
    }
  });
}