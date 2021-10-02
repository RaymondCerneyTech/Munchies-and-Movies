let documenuApiKey = "608aa86465403aca06660a0f7bdd1bc8"
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