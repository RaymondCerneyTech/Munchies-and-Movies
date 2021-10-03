// API call for Movies

// Values and Variables
let rapidApiKey = "5d49265088msh6b983bed1315af1p14dfcbjsnaf5a9469ed5a"
let rapidApiHost = "streaming-availability.p.rapidapi.com"

// on click function to build Movie Streaming API call
$(document).ready(function(){
    $('#searchBtn').on('click', function(){
        var movieGenreEntry = $("#genre").val().trim();
        var movieKeyWordEntry = $("#key-word").val().trim();
        rapidApiRequest(movieKeyWordEntry, movieGenreEntry);
    })
})

// call function for Movie Streaming API
const rapidApiRequest = function(movieKeyWordEntry, movieGenreEntry) {
    fetch("https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=netflix&type=movie&genre=18&page=1&language=en", {
	    "method": "GET",
	    "headers": {
		    "x-rapidapi-host": rapidApiHost,
		    "x-rapidapi-key": rapidApiKey
	    }
    })
    .then(response => {
	    console.log(response);
    })
    .catch(err => {
	    console.error(err);
    })};