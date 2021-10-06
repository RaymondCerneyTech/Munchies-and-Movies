let documenuApiKey = "6700771495msh120d445d9bd47aep17fe83jsn94392ffe5628"
let resturauntZipCodeEntry = ""
let resturauntCuisineEntry = ""
let movieGenreEntry = ""
let movieServiceEntry = ""
let movieKeyWordEntry = ""

//onclick event for search button
$("#searchBtn").on("click", function() {
    resturauntZipCodeEntry = $("#zip-code-entry").val().trim();
    resturauntCuisineEntry = $("#cuisine-entry").val().trim();

    movieGenreEntry = $("#genre").val();
    movieServiceEntry = $("#service").val();
    movieKeyWordEntry = $("#key-word").val().trim();
    
    //if statement to handle search
    if (resturauntZipCodeEntry || resturauntCuisineEntry) {
        //resturaunt API handler
        documenuRequest(resturauntZipCodeEntry, resturauntCuisineEntry)
    } else if (!resturauntZipCodeEntry || !resturauntCuisineEntry) {
        //movie API handler
        rapidApiRequest(movieKeyWordEntry,movieServiceEntry, movieGenreEntry);
    }
    if (movieGenreEntry || movieServiceEntry || movieKeyWordEntry) {
        //movie API handler
        rapidApiRequest(movieKeyWordEntry,movieServiceEntry, movieGenreEntry);
    } else if (!movieGenreEntry || !movieServiceEntry || !movieKeyWordEntry) {
        //resturaunt API handler
        documenuRequest(resturauntZipCodeEntry, resturauntCuisineEntry)
    }
})

const documenuRequest = function(resturauntZipCodeEntry, resturauntCuisineEntry) {
    let documenuApiUrl = 
                    "https://api.documenu.com/v2/restaurants/zip_code/"
                    + resturauntZipCodeEntry
                    + "?"

    // if zip code and cuisine are entered                    
    if (resturauntZipCodeEntry && resturauntCuisineEntry) {
        let resurauntParams = new URLSearchParams()
        resurauntParams.append("cuisine", resturauntCuisineEntry)
        resurauntParams.append("size", 10)
        resurauntParams.append("key", documenuApiKey)
        documenuApiUrl += resurauntParams.toString()

    fetch(documenuApiUrl)
        .then(function(response) {
            console.log(response)
            if (response.ok) {
                console.log(response)
                response.json().then(function(data) {
                    displayResults(data)
                    console.log(data)
                })
            } else {
                alert("Error: " + response.statusText)
            }
        })
        .catch(function(error) {
            alert("Unable to connect to Github");
        })
    } 
    // if nothing is entered
    else if (!resturauntZipCodeEntry && !resturauntCuisineEntry) {
        alert("You must atleast add a zip code!")
    } 
    // if no zip code is entered
    else if (!resturauntZipCodeEntry) {
        alert("You must have a zip code!")
    } 
    //if no cuisine is entered
    else if (!resturauntCuisineEntry) {
        let resurauntParams = new URLSearchParams()
        resurauntParams.append("size", 10)
        resurauntParams.append("key", documenuApiKey)
        documenuApiUrl += resurauntParams.toString()
    
        fetch(documenuApiUrl)
            .then(function(response) {
                console.log(response)
                if (response.ok) {
                    console.log(response)
                    response.json().then(function(data) {
                        displayResults(data)
                        console.log(data)
                    })
                } else {
                    alert("Error: " + response.statusText)
                }
            })
            .catch(function(error) {
                alert("Unable to connect to Github");
            })
    }
}

const displayResults = function(data) {
    $("#results-display").empty();
    for (let i = 0; i < data.data.length; i++) {
        $("#results-display").append($("<div id='restaurant-" + i + "' class='grid grid-rows mt-5 text-lg leading-8'></div>"))
        $("#restaurant-" + i).append($("<h3 id='restaurant-name-" + i + "'>" + data.data[i].restaurant_name + "</h3>"))
        $("#restaurant-" + i).append($("<p>" + data.data[i].address.formatted +"</p>"))
        if (data.data[i].restaurant_website) {
            $("#restaurant-" + i).append($("<a href='" + data.data[i].restaurant_website + "' target='_blank'>" + data.data[i].restaurant_website + "</a>"))
        } else if (!data.data[i].restaurant_website) {
            $("#restaurant-" + i).append($("<p>No Website Available</p>"))
        }
        if (data.data[i].restaurant_phone) {
            $("#restaurant-" + i).append($("<a href= 'tel:" + data.data[i].restaurant_phone + "'>" + data.data[i].restaurant_phone +"</a>"))
        } else if (!data.data[i].restaurant_phone) {
            $("#restaurant-" + i).append($("<p>No Phone Number Available</p>"))
        }}}

// API call for Movies

// Values and Variables
let rapidApiKey = "5d49265088msh6b983bed1315af1p14dfcbjsnaf5a9469ed5a"
let rapidApiHost = "streaming-availability.p.rapidapi.com"

// call function for Movie Streaming API
const rapidApiRequest = function(movieKeyWordEntry, movieServiceEntry, movieGenreEntry) {
    let streamingApiUrl = 
        "https://streaming-availability.p.rapidapi.com/search/basic?country=us&type=movie&page=1&language=en"
        +"&service="+ movieServiceEntry
        +"&genre=" + movieGenreEntry
        +"&keyword=" + movieKeyWordEntry

    if (movieKeyWordEntry && movieServiceEntry && movieGenreEntry) {
        fetch(streamingApiUrl, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": rapidApiHost,
                "x-rapidapi-key": rapidApiKey
            }
        })

        // handle results of Movie API call
        .then(function(response){
            if (response.ok) {
                response.json().then(function(data){
                    movieResults(data);
                });
            } else {
                $("#movie-results").append($("<p class='error'>" + response.statusText + "</p>"));
            }
        })    
        .catch(err => {
            console.error(err);
        });
    } else if (!movieGenreEntry && !movieServiceEntry && !movieKeyWordEntry) {
        console.log(movieGenreEntry, movieServiceEntry, movieKeyWordEntry)
        $("#movie-results").append($("<p class='error'>You must atleast add a streaming service!</p>"));
    } else if (!movieServiceEntry) {
        $("#movie-results").append($("<p class='error'>You must atleast add a streaming service!</p>"));
    } else if (!movieGenreEntry || !movieKeyWordEntry) {
        fetch(streamingApiUrl, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": rapidApiHost,
                "x-rapidapi-key": rapidApiKey
            }
        })

        // handle results of Movie API call
        .then(function(response){
            if (response.ok) {
                response.json().then(function(data){
                    movieResults(data);
                });
            } else {
                $("#movie-results").append($("<p class='error'>" + response.statusText + "</p>"));
            }
        })    
        .catch(err => {
        console.error(err);
        });
    }
} 

// movieResults Function
const movieResults = function(data) {
    $("#movie-results").empty();
    for (let i = 0; i < data.results.length; i++) {
        $("#movie-results").append($("<div id='movie-" + i + "' class='grid grid-rows mt-5 leading-8'></div"));
        $("#movie-" + i).append($("<h3 class='text-2xl' id='movie-name" + i + "'>" + data.results[i].title + "</h3>"));
        $("#movie-" + i).append($("<div class='flex' id='movie-info-" + i + "'></div>"))
        $("#movie-info-" + i).append($("<img class='movie-results-img self-center' src='" + data.results[i].posterURLs[92] + "'/>"));
        $("#movie-info-" + i).append($("<p class='text-lg'>" + data.results[i].overview +"</p>"));
    }
}