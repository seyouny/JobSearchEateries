$(document).ready(function () {

    // these are the input fields to search GitHub jobs
    var userJobDescription = "";
    var userLocation = "";
    var userFullTime = "";

    // this is where we push job search results to
    var companyResults = [];

    // these are the placeholders for displaying the query results in HTML (i.e. we need to add ids to the relevant elements)
    var companyDisplayEl1 = $("#companyDisplayEl1");
    var companyDisplayEl2 = $("#companyDisplayEl2");
    var companyDisplayEl3 = $("#companyDisplayEl3");
    var companyDisplayEl4 = $("#companyDisplayEl4");
    var companyDisplayEl5 = $("#companyDisplayEl5");

    var companyDisplayElAll = [companyDisplayEl1, companyDisplayEl2, companyDisplayEl3, companyDisplayEl4, companyDisplayEl5];

    var locationDisplayEl1 = $("#locationDisplayEl1");
    var locationDisplayEl2 = $("#locationDisplayEl2");
    var locationDisplayEl3 = $("#locationDisplayEl3");
    var locationDisplayEl4 = $("#locationDisplayEl4");
    var locationDisplayEl5 = $("#locationDisplayEl5");

    var locationDisplayElAll = [locationDisplayEl1, locationDisplayEl2, locationDisplayEl3, locationDisplayEl4, locationDisplayEl5];

    var titleDisplayEl1 = $("#titleDisplayEl1");
    var titleDisplayEl2 = $("#titleDisplayEl2");
    var titleDisplayEl3 = $("#titleDisplayEl3");
    var titleDisplayEl4 = $("#titleDisplayEl4");
    var titleDisplayEl5 = $("#titleDisplayEl5");

    var titleDisplayElAll = [titleDisplayEl1, titleDisplayEl2, titleDisplayEl3, titleDisplayEl4, titleDisplayEl5];


    // this is a placeholder for testing purposes(to see what we generate with inputs)
        test();

    function test() {
        userJobDescription = "javascript";
        userLocation = "san jose";
        userFullTime = "yes";
    }


    var queryURL = "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description=" + userJobDescription + "&location=" + userLocation + "&full_time=" + userFullTime;

    // this is a placeholder for the ajax connection for GitHub jobs (to be moved under submit button on click once html is ready)
    jobSearch();
    function jobSearch() {

        $.ajax({
            url: queryURL,
            method: "GET",

        }).then(function (response) {
            console.log("GitHub: " + JSON.stringify(response));
            console.log("Company: " + response[0].company);
            console.log("Location: " + response[0].location);
            console.log("Title: " + response[0].title);

            // pushes first 5 results into var companyResults
            var company = "";
            var location = "";
            var title = "";
            var type = "";
            var company_url = "";
            var created_at = "";
            var description = "";
            var how_to_apply = "";
            var company_logo = "";

            for (var i = 0; i < 5; i++) {
                company = response[i].company;
                location = response[i].location;
                title = response[i].title;
                type = response[i].type;
                company_url = response[i].company_url;
                created_at = response[i].created_at;
                description = response[i].description;
                how_to_apply = response[i].how_to_apply;
                company_logo = response[i].company_logo;
                companyResults.push({ company: company, location: location, title: title, type: type, url: company_url, created: created_at, description: description, how_to_apply: how_to_apply, logo: company_logo });
                console.log(company)
                //Adding to HTML elements to display on screen
                companyDisplayEl1.html("<h1>"+company+"</h1>")
            }

            console.log(companyResults)

            console.log(companyResults[0].company);
            console.log(companyResults[0].location);
            console.log(companyResults[0].title);

            // populates html elements with company, location, and title for first 5 results
            for (var i = 0; i < 5; i++) {
                companyDisplayElAll[i].text(companyResults[i].company);
                locationDisplayElAll[i].text(companyResults[i].location);
                titleDisplayElAll[i].text(companyResults[i].title);
            }

        })

    }

    // start of Google Places

    // this variable should be equal to: companyResults[0].company+" "+companyResults[0].location;
    var gitJobInput = "";

    var restaurantResults = [];
    var cafeResults = [];
    var barResults = [];

    // this is a placeholder for testing purposes (to see what we generate with inputs)
    test2();

    function test2() {
        gitJobInput = "Lawrence Berkeley National Laboratory  Berkeley";
    }

    // this is a placeholder for the ajax connection for Google Places (to be moved under on click once html is ready)




    var googleKey = "AIzaSyB-ehBeU-4Z5TYNJpC70UeoXVspIgUkotw";


    // this is to get the location of the job
    var queryCompanyLookupURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + gitJobInput + "&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=" + googleKey

    function placesNearby() {

        $.ajax({
            url: queryCompanyLookupURL,
            method: "GET",

        }).then(function (response) {
            console.log("GooglePlaces: " + JSON.stringify(response));
            console.log("GooglePlaces: " + queryCompanyLookupURL);
            console.log("Latitude: " + response.candidates[0].geometry.location.lat);
            console.log("Longitude: " + response.candidates[0].geometry.location.lng);
            var lat = response.candidates[0].geometry.location.lat;
            var long = response.candidates[0].geometry.location.lng;

            // this is to get restaurants nearby
            var queryNearbyLookupURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + long + "&radius=1500&type=restaurant&key=" + googleKey;

            $.ajax({
                url: queryNearbyLookupURL,
                method: "GET",

            }).then(function (response) {
                console.log("GooglePlacesNearby: " + JSON.stringify(response));

                var name = "";
                var rating = "";
                var user_ratings_total = "";
                var place_id = ""; //need this to get detailed info including opening hours
                var price_level = "";
                var vicinity = "";

                for (var i = 0; i < 5; i++) {
                    name = response.results[i].name;
                    rating = response.results[i].rating;
                    user_ratings_total = response.results[i].user_ratings_total;
                    place_id = response.results[i].place_id;
                    price_level = response.results[i].price_level;
                    vicinity = response.results[i].vicinity;
                    restaurantResults.push({ name: name, rating: rating, total_ratings: user_ratings_total, id: place_id, price: price_level, vicinity: vicinity });
                }
                console.log(restaurantResults);
            })

            // this is to get cafes nearby
            var queryNearbyCoffeeLookupURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + long + "&radius=1500&type=cafe&key=" + googleKey;

            $.ajax({
                url: queryNearbyCoffeeLookupURL,
                method: "GET",

            }).then(function (response) {
                console.log("GoogleCoffeeNearby: " + JSON.stringify(response));

                var name = "";
                var rating = "";
                var user_ratings_total = "";
                var place_id = ""; //need this to get detailed info including opening hours
                var price_level = "";
                var vicinity = "";

                for (var i = 0; i < 5; i++) {
                    name = response.results[i].name;
                    rating = response.results[i].rating;
                    user_ratings_total = response.results[i].user_ratings_total;
                    place_id = response.results[i].place_id;
                    price_level = response.results[i].price_level;
                    vicinity = response.results[i].vicinity;
                    cafeResults.push({ name: name, rating: rating, total_ratings: user_ratings_total, id: place_id, price: price_level, vicinity: vicinity  });
                }
                console.log(cafeResults);
            })

            // this is to get bars nearby
            var queryNearbyCoffeeLookupURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + long + "&radius=1500&type=bar&key=" + googleKey;

            $.ajax({
                url: queryNearbyCoffeeLookupURL,
                method: "GET",

            }).then(function (response) {
                console.log("GoogleBarNearby: " + JSON.stringify(response));

                var name = "";
                var rating = "";
                var user_ratings_total = "";
                var place_id = ""; //need this to get detailed info including opening hours
                var price_level = "";
                var vicinity = "";

                for (var i = 0; i < 5; i++) {
                    name = response.results[i].name;
                    rating = response.results[i].rating;
                    user_ratings_total = response.results[i].user_ratings_total;
                    place_id = response.results[i].place_id;
                    price_level = response.results[i].price_level;
                    vicinity = response.results[i].vicinity;
                    barResults.push({ name: name, rating: rating, total_ratings: user_ratings_total, id: place_id, price: price_level, vicinity: vicinity  });
                }
                console.log(barResults);
            })

        })
    }

    var placeName = "";
    var placeInfo = [];

    // this is a placeholder for testing purposes (to see what we generate with inputs)
    test3();

    function test3() {
        placeName = "Free House  2700 Bancroft Way, Berkeley";
    }

    // this is to get additional information of places nearby
    var queryPlaceLookupURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + placeName + "&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key="+ googleKey;


    var formatted_address = "";
    var name = "";
    var opening_hours = "";
    var photos = "";
    

    placesNearby(); //remove - for testing only

    function placesNearby() {

        $.ajax({
            url: queryPlaceLookupURL,
            method: "GET",

        }).then(function (response) {
            console.log("Place Nearby Check: " + JSON.stringify(response));
            formatted_address = response.candidates[0].formatted_address;
            name = response.candidates[0].name;
            opening_hours = response.candidates[0].opening_hours;
            photos = response.candidates[0].photos[0].html_attributions;
            placeInfo.push({address: formatted_address, name: name, open: opening_hours, photos: photos})

            console.log(placeInfo);
        }
        )
    }
})

