/**
 * Alfredo Rodriguez
 * Date:
 */


console.log('Keys Have Loaded!\n');

//Twitter Key

var Twitter = require('twitter');

exports.twitterKeys = new Twitter({
    consumer_key: '96nwcuaeNeC0g3vVLJXKTHreD',
    consumer_secret: 'OYYjd6qr0g31LREOQ6kmTiCvo9ijIm3Sm0mC8CRsesSn5P0OuR',
    access_token_key: '826722529-ZXQuEjEMqm8ZYWjbJkLl82sdSc3ivg6NhK3DPrw7',
    access_token_secret: 'hQDugqMYiysXg3wWAS6vDN58t7BFjbCVligRoLzcwkUl0'
});

//Spotify Key
var Spotify = require('node-spotify-api');

exports.spotify = new Spotify({id: "ac6b318d9110461697035255cc1025ca",
    secret: "b6f319dfd30f4f418e5501ce4d902b27"});