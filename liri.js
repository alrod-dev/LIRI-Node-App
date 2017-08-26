//Stores twitter keys from keys.js into a variable

//Require keys.js
var keys = require('./keys.js');


//calls for twitter key
var twitter = keys.twitterKeys;

//calls for spotify key
var spotify = keys.spotify;


//require request package for OMDb scraping
var request = require('request');

//require file structure package
var fs = require("fs");


//Stores command line command in command var
var command = process.argv[2];
var searchTerm = process.argv[3];

function isEmpty(val){
    return (val === undefined || val == null || val.length <= 0);
}

function userInput() {

    if (command === "the-dons-tweets") {

        console.log("Donald Trump's most recent tweet:\n");


        twitter.get('statuses/user_timeline', {screen_name: 'realDonaldTrump', count: 20}, function (error, data, response) {

            var tweets = data;

            if (error) {
                console.log(error.message);
            }

            for (var i = 0; i < tweets.length; i++) {

                console.log(tweets[i].text + "\n");

            }

        });


    }

    else if (command === "my-tweets") {

        console.log("My 20 most recent tweets:");

        twitter.get('statuses/user_timeline',{screen_name: 'alrod909', count: 20}, function (error, data, response) {

            var tweets = data;

            if (error) {
                console.log(error.message);
            }

            for (var i = 0; i < tweets.length; i++) {

                console.log(tweets[i].text + "\n");

            }
        });
    }

    else if (command === "spotify-this-searchTerm") {

        if (isEmpty(searchTerm)) {

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

            spotify.search({type: 'track', query: searchTerm}, function (err, data) {


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

        searchTerm = searchTerm.split(" ").join("+");

        request("http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

            console.log(JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country Produced: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Movie Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        });
    }

    else if (command === "do-what-it-says") {
        var randText;
        fs.readFile('./random.txt', "UTF8", function (err, data) {

            if (err) throw err;

            console.log(data);

            randText = data.split(",");

            command = randText[0];
            searchTerm = randText[1];

            userInput();

        });
    }

    else {
        console.log("The command you entered was not understood. Please Enter one of the following commands:");
        console.log("--> my-tweets : Displays the last 20 tweets you have posted");
        console.log("--> spotify-this-searchTerm 'searchTerm title' : Displays Spotify info on the entered searchTerm");
        console.log("--> movie-this 'movie title' : Displays IMDb info on selected movie. If no title is entered, defaults to Mr. Nobody");
        console.log("--> do-what-it-says : Uses the contents of random.txt as the inputted command");
    }

}

userInput();