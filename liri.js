//Stores twitter keys from keys.js into a variable

//Require keys.js
var keys = require('./keys.js');


//calls for twitter key
var twitter = keys.twitterKeys;

//calls for spotify key
var spotify = keys.spotify;


//require request package for OMDb scraping
var request = require("request");


//require file structure package
var fs = require("fs");


//Stores command line command in command var
var command = process.argv[2];

function userInput() {

    if (command === "the-dons-tweets") {

        console.log("Donald Trump's most recent tweet:\n");


        twitter.get('users/show', {screen_name: 'realDonaldTrump'}, function (error, data, response) {

            var tweets = data.status.text;

            console.log(tweets);

        });


    }

    else if (command === "my-tweets") {

        console.log("My 20 most recent tweets:");

        twitter.get('statuses/home_timeline', {count: 20}, function (error, data, response) {

            var tweets = data;

            if (error) {
                console.log(error.message);
            }

            for (var i = 0; i < tweets.length; i++) {

                console.log(tweets[i].text + "\n");

            }
        });
    }

    else if (command === "spotify-this-song") {

        console.log("Song Info:");


        var song = process.argv[3];

        if (song.isEmptyObject()) {

            spotify.search({type: 'track', query: "The Sign"}, function (err, data) {


                if (err) {
                    return console.log('Error occurred: ' + err);
                }


                for (var i = 0; i < data.tracks.items.length; i++) {
                    console.log("Default Song: 'The Sign'\n");

                    console.log("Title      : " + data.tracks.items[i].name);
                    console.log("Artist     : " + data.tracks.items[i].album.artists[0].name);
                    // }
                    console.log("Album      : " + data.tracks.items[i].album.name);
                    console.log("Preview URL: " + data.tracks.items[i].preview_url);
                    console.log("--------------------------------------------")
                }

            });

        }

        else {

            spotify.search({type: 'track', query: song}, function (err, data) {


                if (err) {
                    return console.log('Error occurred: ' + err);
                }

                else {

                    for (var i = 0; i < data.tracks.items.length; i++) {
                        console.log("Song Info  :\n");

                        console.log("Title      : " + data.tracks.items[i].name);
                        console.log("Artist     : " + data.tracks.items[i].album.artists[0].name);
                        // }
                        console.log("Album      : " + data.tracks.items[i].album.name);
                        console.log("Preview URL: " + data.tracks.items[i].preview_url);
                        console.log("--------------------------------------------")
                    }

                }
            });

        }

    }

    else if (command === "movie-this") {
        console.log("Movie Info:");
    }

    else if (command === "do-what-it-says") {
        var randText;
        fs.readFile('./random.txt', function (err, data) {
            if (err) throw err;
            console.log(data);
            randText = JSON.stringify(data);
            console.log("The command from random.txt was: " + randText);
        });
    }

    else {
        console.log("The command you entered was not understood. Please Enter one of the following commands:");
        console.log("--> my-tweets : Displays the last 20 tweets you have posted");
        console.log("--> spotify-this-song 'song title' : Displays Spotify info on the entered song");
        console.log("--> movie-this 'movie title' : Displays IMDb info on selected movie. If no title is entered, defaults to Mr. Nobody");
        console.log("--> do-what-it-says : Uses the contents of random.txt as the inputted command");
    }

}

userInput();