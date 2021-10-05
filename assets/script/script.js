// API call for Movies

// Values and Variables
let rapidApiKey = "5d49265088msh6b983bed1315af1p14dfcbjsnaf5a9469ed5a"
let rapidApiHost = "streaming-availability.p.rapidapi.com"

// on click function to build Movie Streaming API call
$('#searchBtn').on('click', function(){
    var movieGenreEntry = $("#genre").val();
    var movieServiceEntry =$("#service").val();
    var movieKeyWordEntry = $("#key-word").val().trim();
    rapidApiRequest(movieKeyWordEntry,movieServiceEntry, movieGenreEntry);
})


// call function for Movie Streaming API
const rapidApiRequest = function(movieKeyWordEntry, movieServiceEntry, movieGenreEntry) {
    let streamingApiUrl = 
        "https://streaming-availability.p.rapidapi.com/search/basic?country=us&type=movie&page=1&language=en"
        +"&service="+ movieServiceEntry
        +"&genre=" + movieGenreEntry
        +"&keyword=" + movieKeyWordEntry

    fetch(streamingApiUrl, {
	    "method": "GET",
	    "headers": {
		    "x-rapidapi-host": rapidApiHost,
		    "x-rapidapi-key": rapidApiKey
	    }
    })

    // handle results of Movie API call
    .then(function(response){
        response.json().then(function(data){
            movieResults(data);
        });
    })    
    .catch(err => {
	   console.error(err);
    });
}

// movieResults Function
const movieResults = function(data) {
    $("#movie-results").empty();
    for (let i = 0; i < data.results.length; i++) {
        $("#movie-results").append($("<div id='movie-" + i + "' class='grid grid-rows mt-5 text-lg leading-8'></div"));
        $("#movie-" + i).append($("<h3 id='movie-name" + i + "'>" + data.results[i].title + "</h3>"));
        $("#movie-" + i).append($("<p>" + data.results[i].overview +"</p>"));
        $("#movie-" + i).append($("<img src='" + data.results[i].posterURLs[92] + "'/>"));
    }
}