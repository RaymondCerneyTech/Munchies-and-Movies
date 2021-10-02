let documenuApiKey = "8545b0df8628258e2380d4b6f5d685a0"
let resturauntZipCodeEntry = ""
let resturauntCuisineEntry = ""

//onclick event for search button
$("#searchBtn").on("click", function() {
    resturauntZipCodeEntry = $("#zip-code-entry").val().trim();
    resturauntCuisineEntry = $("#cuisine-entry").val().trim();
    documenuRequest(resturauntZipCodeEntry, resturauntCuisineEntry)
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
        }
    }
}



//</div> container
//h3 resturaunt name
//p address
//a phone number
//a website
//</div>