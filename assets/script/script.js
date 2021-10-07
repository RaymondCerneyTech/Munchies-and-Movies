let documenuApiKey = "197492e7257dcf71de01b59fa6410078"
let resturauntZipCodeEntry = ""
let resturauntCuisineEntry = ""
let movieGenreEntry = ""
let movieServiceEntry = ""
let movieKeyWordEntry = ""
let previousResults = {}

//onclick event for search button
$("#search-button").on("click", function() {
    //empty div contents
    $("#munchies-results").empty();
    $("#movie-results").empty();
    //set value of variables
    resturauntZipCodeEntry = $("#zip-code-entry").val().trim();
    previousResults.zipcode = resturauntZipCodeEntry
    resturauntCuisineEntry = $("#cuisine-entry").val().trim();
    previousResults.cuisine = resturauntCuisineEntry

    movieGenreEntry = $("#genre").val();
    previousResults.genre = movieGenreEntry
    movieServiceEntry = $("#service").val();
    previousResults.service = movieServiceEntry
    movieKeyWordEntry = $("#key-word").val().trim();
    previousResults.keyword = movieKeyWordEntry
    //call saveRestults() to save data in localStorage
    saveResults();
    
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

//api request for resturaunts
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
            if (response.ok) {
                response.json().then(function(data) {
                    munchiesResults(data)
                })
            } else {
                $("#munchies-results").empty();
                $("#munchies-results").append($("<p class='error text-center mt-3 md:'>"+ response.statusText +"</p>"))
            }
        })
        .catch(function(error) {
            $("#munchies-results").empty();
            $("#munchies-results").append($("<p class='error text-center mt-3 md:'>Unable to connect to GitHub</p>"))
        })
    } 
    // if nothing is entered
    else if (!resturauntZipCodeEntry && !resturauntCuisineEntry) {
        $("#munchies-results").empty();
        $("#munchies-results").append($("<p class='error text-center mt-3 md:'>You must atleast add a zip code!</p>"))
    } 
    // if no zip code is entered
    else if (!resturauntZipCodeEntry) {
        $("#munchies-results").empty();
        $("#munchies-results").append($("<p class='error text-center mt-3 md:'>You must have a zip code!</p>"))
    } 
    //if no cuisine is entered
    else if (!resturauntCuisineEntry) {
        let resurauntParams = new URLSearchParams()
        resurauntParams.append("size", 10)
        resurauntParams.append("key", documenuApiKey)
        documenuApiUrl += resurauntParams.toString()
    
        fetch(documenuApiUrl)
            .then(function(response) {
                if (response.ok) {
                    response.json().then(function(data) {
                        munchiesResults(data)
                    })
                } else {
                    $("#munchies-results").empty();
                    $("#munchies-results").append($("<p class='error text-center mt-3 md:'>"+ response.statusText +"</p>"))
                }
            })
            .catch(function(error) {
                $("#munchies-results").empty();
                $("#munchies-results").append($("<p class='error text-center mt-3 md:'>Unable to connect to GitHub</p>"))
            })
    }
}

//function to display results and append to page
const munchiesResults = function(data) {
    $("#munchies-results").empty();
    for (let i = 0; i < data.data.length; i++) {
        $("#munchies-results").append($("<div id='restaurant-" + i + "' class='grid grid-rows mt-5 text-lg leading-8'></div>"))
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
let rapidApiKey = "46e26cd4acmsh5182eb45f4f0472p1e5c92jsn75dbdcee6f90"
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
                $("#movie-results").empty();
                $("#movie-results").append($("<p class='movie-error text-center mt-3 md:'>" + response.statusText + "</p>"));
            }
        })    
        .catch(err => {
            console.error(err);
        });
    } else if (!movieGenreEntry && !movieServiceEntry && !movieKeyWordEntry) {
        $("#movie-results").empty();
        $("#movie-results").append($("<p class='movie-error text-center mt-3 md:'>You must atleast add a streaming service!</p>"));
    } else if (!movieServiceEntry) {
        $("#movie-results").empty();
        $("#movie-results").append($("<p class='movie-error text-center mt-3 md:'>You must atleast add a streaming service!</p>"));
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
                $("#movie-results").empty();
                $("#movie-results").append($("<p class='movie-error text-center mt-3 md:'>" + response.statusText + "</p>"));
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

//save the most recently searched criteria to pre existing object
const saveResults = function() {
    localStorage.setItem("previous-search", JSON.stringify(previousResults));
}

//if no value exists, leave object key:value pair empty, otherwise update variables with localStorage values and run fetch calls
const displayResults = function() {
    previousResults = JSON.parse(localStorage.getItem("previous-search"))
    if (!previousResults) {
        previousResults = {
            zipcode: "",
            cuisine: "",
            genre: "",
            service: "",
            keyword: ""
        }
    } else {
        resturauntZipCodeEntry = previousResults.zipcode
        resturauntCuisineEntry = previousResults.cuisine
        movieGenreEntry = previousResults.genre
        movieServiceEntry = previousResults.service
        movieKeyWordEntry = previousResults.keyword

        // if statement to handle search
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
        } 
        else if (!movieGenreEntry || !movieServiceEntry || !movieKeyWordEntry) {
            //resturaunt API handler
            documenuRequest(resturauntZipCodeEntry, resturauntCuisineEntry)
        }
    }
}

//append previously searched results to page
displayResults();