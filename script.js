$(document).ready(function () {

    // these are the input fields to search GitHub jobs
    var userJobDescription = $("#describeInput");
    var userLocation = $("#locationInput");
    var submitButton = $("#searchButton");

    // this is where we push job search results to
    var companyResults = [];

    // these are the placeholders for displaying the query results in HTML (i.e. we need to add ids to the relevant elements)
    var companyDisplayEl1 = $("#companyDisplayEl1");
    var companyDisplayEl2 = $("#companyDisplayEl2");
    var companyDisplayEl3 = $("#companyDisplayEl3");
    var companyDisplayEl4 = $("#companyDisplayEl4");
    var companyDisplayEl5 = $("#companyDisplayEl5");

    companyDisplayEl1.data("value", 0)
    companyDisplayEl2.data("value", 1)
    companyDisplayEl3.data("value", 2)
    companyDisplayEl4.data("value", 3)
    companyDisplayEl5.data("value", 4)

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

    var jobDisplayEl1 = $("#jobDisplayEl1");
    var jobDisplayEl2 = $("#jobDisplayEl2");
    var jobDisplayEl3 = $("#jobDisplayEl3");
    var jobDisplayEl4 = $("#jobDisplayEl4");
    var jobDisplayEl5 = $("#jobDisplayEl5");
    var jobDisplayElAll = [jobDisplayEl1, jobDisplayEl2, jobDisplayEl3, jobDisplayEl4, jobDisplayEl5];
    // Search button click event

    var gitJobInput = "";
    var restaurantResults = [];
    var cafeResults = [];
    var barResults = [];

    submitButton.click(function () {
        var userFullTime = $("#myCheck").is(":checked");
        for (var i = 0; i < 5; i++) {

            companyDisplayElAll[i].text("");
            locationDisplayElAll[i].text("");
            titleDisplayElAll[i].text("");
        }
        companyResults = [];
        restaurantResults = [];
        cafeResults = [];
        barResults = [];

        jobDescription = userJobDescription.val();
        eLocation = userLocation.val();
        if (userFullTime === true) {
            fullTime = "yes";
        }
        else {
            fullTime = "no";
        }

        console.log(userFullTime)


        jobSearch();
    })

    function jobSearch() {
        var queryURL = "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description=" + jobDescription + "&location=" + eLocation + "&full_time=" + fullTime;

        $.ajax({
            url: queryURL,
            method: "GET",

        }).then(function (response) {
            console.log("response length: "+response.length);
            console.log("response: "+response);
            if(response.length === 0){
                companyDisplayElAll[0].text("No Results - Please Search Again");
                return;
            }
            else{
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

            for (var i = 0; i < response.length; i++) {

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

                // console.log(company)
                //Adding to HTML elements to display on screen
            }

            }


            // populates html elements with company, location, and title for first 5 results
           
            if (companyResults.length < 5) {
                for (var i = 0; i < companyResults.length; i++) {

                    companyDisplayElAll[i].text(companyResults[i].company);
                    locationDisplayElAll[i].text(companyResults[i].location);
                    titleDisplayElAll[i].text(companyResults[i].title);
                }
            }
            else {
                for (var i = 0; i < 5; i++) {

                    companyDisplayElAll[i].text(companyResults[i].company);
                    locationDisplayElAll[i].text(companyResults[i].location);
                    titleDisplayElAll[i].text(companyResults[i].title);
                }
            }

        })

    }

    // start of Google Places





    var googleKey = "AIzaSyB-ehBeU-4Z5TYNJpC70UeoXVspIgUkotw";

    // this is to get the location of the job
    companyDisplayEl1.click(function () {
        $("#restListEl").html("");
        $("#cafeListEl").html("");
        $("#barListEl").html("");
        $("#showAddress").text("");
        restaurantResults = [];
        cafeResults = [];
        barResults = [];

        i = companyDisplayEl1.data("value")
        var jobDescriptionDisplay = $("#jobDescriptionEl");
        jobDescriptionDisplay.html("")
        jobDescriptionDisplay.append("<h1>" + companyResults[i].company + "</h1>, " + "<h2>" + companyResults[i].location + "</h2>");
        jobDescriptionDisplay.append("<h2>" + companyResults[i].title + "</h2>");

        jobDescriptionDisplay.append("<p>" + companyResults[i].description + "</p>");
        gitJobInput = companyResults[i].company + "+" + companyResults[i].location.trim()
        var replaced = gitJobInput.split(' ').join('+');
        var replaced2 = replaced.split('#').join('+');

        console.log(gitJobInput)
        console.log("replaced2: " + replaced2)



        var queryCompanyLookupURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + replaced2 + "&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=" + googleKey

        $.ajax({
            url: queryCompanyLookupURL,
            method: "GET",

        }).then(function (response) {
            console.log("GooglePlaces: " + JSON.stringify(response));
            console.log("GooglePlaces: " + queryCompanyLookupURL);
            console.log("response: " + response.status)

            if (response.status === "ZERO_RESULTS") {
                $("#showAddress").text("Company address cannot be identified - please contact job poster for further details.");
                return;
            }
            else {



                var lat = response.candidates[0].geometry.location.lat;
                var long = response.candidates[0].geometry.location.lng;
                var compAddress = response.candidates[0].formatted_address;
                $("#showAddress").text("Showing results for places near: " + compAddress);
            }

            // this is to get restaurants nearby
            var queryNearbyLookupURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + long + "&radius=1500&type=restaurant&key=" + googleKey;

            $.ajax({
                url: queryNearbyLookupURL,
                method: "GET",

            }).then(function (response) {
                console.log("GooglePlacesNearby: " + JSON.stringify(response));

                var name = "";
                var nameLink = ""; //new
                var nameText = ""; //new
                var rating = "";
                var user_ratings_total = "";
                var place_id = ""; //need this to get detailed info including opening hours
                var price_level = "";
                var vicinity = "";

                for (var i = 0; i < 5; i++) {
                    name = response.results[i].name;
                    nameLink = $('<a href="#">' + response.results[i].name + " " + "</a>");
                    nameText = $('<p style="display:inline-block">' + " " + " | Rating: " + rating + " | No. of ratings: " + user_ratings_total + "</p>")
                    rating = response.results[i].rating;
                    user_ratings_total = response.results[i].user_ratings_total;
                    place_id = response.results[i].place_id;
                    price_level = response.results[i].price_level;
                    vicinity = response.results[i].vicinity;
                    restaurantResults.push({ name: name, rating: rating, total_ratings: user_ratings_total, id: place_id, price: price_level, vicinity: vicinity });

                    var newLi = $('<li style="list-style-type: none;">'); //new
                    newLi.append(nameLink, nameText); //new
                    // newLi.text(" | Rating: " + rating + " | No. of ratings: " + user_ratings_total);
                    nameLink.attr("data-value", name + " " + vicinity); //new
                    nameLink.addClass("placeNearby"); //new
                    $("#restListEl").append(newLi);
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
                var nameLink = ""; //new
                var nameText = ""; //new
                var rating = "";
                var user_ratings_total = "";
                var place_id = ""; //need this to get detailed info including opening hours
                var price_level = "";
                var vicinity = "";

                for (var i = 0; i < 5; i++) {
                    name = response.results[i].name;
                    nameLink = $('<a href="#">' + response.results[i].name + " " + "</a>");
                    nameText = $('<p style="display:inline-block">' + " " + " | Rating: " + rating + " | No. of ratings: " + user_ratings_total + "</p>")
                    rating = response.results[i].rating;
                    user_ratings_total = response.results[i].user_ratings_total;
                    place_id = response.results[i].place_id;
                    price_level = response.results[i].price_level;
                    vicinity = response.results[i].vicinity;
                    cafeResults.push({ name: name, rating: rating, total_ratings: user_ratings_total, id: place_id, price: price_level, vicinity: vicinity });

                    var newLi = $('<li style="list-style-type: none;">'); //new
                    newLi.append(nameLink, nameText); //new
                    // newLi.text(" | Rating: " + rating + " | No. of ratings: " + user_ratings_total);
                    nameLink.attr("data-value", name + " " + vicinity); //new
                    nameLink.addClass("placeNearby"); //new
                    $("#cafeListEl").append(newLi);
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
                var nameLink = ""; //new
                var nameText = ""; //new
                var rating = "";
                var user_ratings_total = "";
                var place_id = ""; //need this to get detailed info including opening hours
                var price_level = "";
                var vicinity = "";

                for (var i = 0; i < 5; i++) {
                    name = response.results[i].name;
                    nameLink = $('<a href="#">' + response.results[i].name + " " + "</a>");
                    nameText = $('<p style="display:inline-block">' + " " + " | Rating: " + rating + " | No. of ratings: " + user_ratings_total + "</p>")
                    rating = response.results[i].rating;
                    user_ratings_total = response.results[i].user_ratings_total;
                    place_id = response.results[i].place_id;
                    price_level = response.results[i].price_level;
                    vicinity = response.results[i].vicinity;
                    barResults.push({ name: name, rating: rating, total_ratings: user_ratings_total, id: place_id, price: price_level, vicinity: vicinity });

                    var newLi = $('<li style="list-style-type: none;">'); //new
                    newLi.append(nameLink, nameText); //new
                    // newLi.text(" | Rating: " + rating + " | No. of ratings: " + user_ratings_total);
                    nameLink.attr("data-value", name + " " + vicinity); //new
                    nameLink.addClass("placeNearby"); //new
                    $("#barListEl").append(newLi);
                }
                console.log(barResults);
            })
        })


    })
    companyDisplayEl2.click(function () {
        i = companyDisplayEl2.data("value")


        var jobDescriptionDisplay = $("#jobDescriptionEl");
        jobDescriptionDisplay.html("")
        jobDescriptionDisplay.append("<h1>" + companyResults[i].company + "</h1>, " + "<h2>" + companyResults[i].location + "</h2>");
        jobDescriptionDisplay.append("<h2>" + companyResults[i].title + "</h2>");

        jobDescriptionDisplay.append("<p>" + companyResults[i].description + "</p>");
        gitJobInput = companyResults[i].company + "+" + companyResults[i].location.trim()
        var replaced = gitJobInput.split(' ').join('+');
        var replaced2 = replaced.split('#').join('+');

        console.log(gitJobInput)
        console.log("replaced2: " + replaced2)
        $("#restListEl").html("");
        $("#cafeListEl").html("");
        $("#barListEl").html("");
        $("#showAddress").text("");
        restaurantResults = [];
        cafeResults = [];
        barResults = [];


        var queryCompanyLookupURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + replaced2 + "&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=" + googleKey

        $.ajax({
            url: queryCompanyLookupURL,
            method: "GET",

        }).then(function (response) {
            console.log("GooglePlaces: " + JSON.stringify(response));
            console.log("GooglePlaces: " + queryCompanyLookupURL);
            console.log("response: " + response.status)
            // console.log("Latitude: " + response.candidates[0].geometry.location.lat);
            // console.log("Longitude: " + response.candidates[0].geometry.location.lng);
            if (response.status === "ZERO_RESULTS") {
                $("#showAddress").text("Company address cannot be identified - please contact job poster for further details.");
                return;
            }
            else {



                var lat = response.candidates[0].geometry.location.lat;
                var long = response.candidates[0].geometry.location.lng;
                var compAddress = response.candidates[0].formatted_address;
                $("#showAddress").text("Showing results for places near: " + compAddress);
            }

            // this is to get restaurants nearby
            var queryNearbyLookupURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + long + "&radius=1500&type=restaurant&key=" + googleKey;

            $.ajax({
                url: queryNearbyLookupURL,
                method: "GET",

            }).then(function (response) {
                console.log("GooglePlacesNearby: " + JSON.stringify(response));

                var name = "";
                var nameLink = ""; //new
                var nameText = ""; //new
                var rating = "";
                var user_ratings_total = "";
                var place_id = ""; //need this to get detailed info including opening hours
                var price_level = "";
                var vicinity = "";

                for (var i = 0; i < 5; i++) {
                    name = response.results[i].name;
                    nameLink = $('<a href="#">' + response.results[i].name + " " + "</a>");
                    nameText = $('<p style="display:inline-block">' + " " + " | Rating: " + rating + " | No. of ratings: " + user_ratings_total + "</p>")
                    rating = response.results[i].rating;
                    user_ratings_total = response.results[i].user_ratings_total;
                    place_id = response.results[i].place_id;
                    price_level = response.results[i].price_level;
                    vicinity = response.results[i].vicinity;
                    restaurantResults.push({ name: name, rating: rating, total_ratings: user_ratings_total, id: place_id, price: price_level, vicinity: vicinity });

                    var newLi = $('<li style="list-style-type: none;">'); //new
                    newLi.append(nameLink, nameText); //new
                    // newLi.text(" | Rating: " + rating + " | No. of ratings: " + user_ratings_total);
                    nameLink.attr("data-value", name + " " + vicinity); //new
                    nameLink.addClass("placeNearby"); //new
                    $("#restListEl").append(newLi);
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
                var nameLink = ""; //new
                var nameText = ""; //new
                var rating = "";
                var user_ratings_total = "";
                var place_id = ""; //need this to get detailed info including opening hours
                var price_level = "";
                var vicinity = "";

                for (var i = 0; i < 5; i++) {
                    name = response.results[i].name;
                    nameLink = $('<a href="#">' + response.results[i].name + " " + "</a>");
                    nameText = $('<p style="display:inline-block">' + " " + " | Rating: " + rating + " | No. of ratings: " + user_ratings_total + "</p>")
                    rating = response.results[i].rating;
                    user_ratings_total = response.results[i].user_ratings_total;
                    place_id = response.results[i].place_id;
                    price_level = response.results[i].price_level;
                    vicinity = response.results[i].vicinity;
                    cafeResults.push({ name: name, rating: rating, total_ratings: user_ratings_total, id: place_id, price: price_level, vicinity: vicinity });

                    var newLi = $('<li style="list-style-type: none;">'); //new
                    newLi.append(nameLink, nameText); //new
                    // newLi.text(" | Rating: " + rating + " | No. of ratings: " + user_ratings_total);
                    nameLink.attr("data-value", name + " " + vicinity); //new
                    nameLink.addClass("placeNearby"); //new
                    $("#cafeListEl").append(newLi);
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
                var nameLink = ""; //new
                var nameText = ""; //new
                var rating = "";
                var user_ratings_total = "";
                var place_id = ""; //need this to get detailed info including opening hours
                var price_level = "";
                var vicinity = "";

                for (var i = 0; i < 5; i++) {
                    name = response.results[i].name;
                    nameLink = $('<a href="#">' + response.results[i].name + " " + "</a>");
                    nameText = $('<p style="display:inline-block">' + " " + " | Rating: " + rating + " | No. of ratings: " + user_ratings_total + "</p>")
                    rating = response.results[i].rating;
                    user_ratings_total = response.results[i].user_ratings_total;
                    place_id = response.results[i].place_id;
                    price_level = response.results[i].price_level;
                    vicinity = response.results[i].vicinity;
                    barResults.push({ name: name, rating: rating, total_ratings: user_ratings_total, id: place_id, price: price_level, vicinity: vicinity });

                    var newLi = $('<li style="list-style-type: none;">'); //new
                    newLi.append(nameLink, nameText); //new
                    // newLi.text(" | Rating: " + rating + " | No. of ratings: " + user_ratings_total);
                    nameLink.attr("data-value", name + " " + vicinity); //new
                    nameLink.addClass("placeNearby"); //new
                    $("#barListEl").append(newLi);
                }
                console.log(barResults);
            })
        })


    })
    companyDisplayEl3.click(function () {
        i = companyDisplayEl3.data("value")

        var jobDescriptionDisplay = $("#jobDescriptionEl");
        jobDescriptionDisplay.html("")
        jobDescriptionDisplay.append("<h1>" + companyResults[i].company + "</h1>, " + "<h2>" + companyResults[i].location + "</h2>");
        jobDescriptionDisplay.append("<h2>" + companyResults[i].title + "</h2>");

        jobDescriptionDisplay.append("<p>" + companyResults[i].description + "</p>");

        gitJobInput = companyResults[i].company + "+" + companyResults[i].location.trim()
        var replaced = gitJobInput.split(' ').join('+');
        var replaced2 = replaced.split('#').join('+');

        console.log(gitJobInput)
        console.log("replaced2: " + replaced2)
        $("#restListEl").html("");
        $("#cafeListEl").html("");
        $("#barListEl").html("");
        $("#showAddress").text("");
        restaurantResults = [];
        cafeResults = [];
        barResults = [];


        var queryCompanyLookupURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + replaced2 + "&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=" + googleKey

        $.ajax({
            url: queryCompanyLookupURL,
            method: "GET",

        }).then(function (response) {
            console.log("GooglePlaces: " + JSON.stringify(response));
            console.log("GooglePlaces: " + queryCompanyLookupURL);
            console.log("response: " + response.status)

            if (response.status === "ZERO_RESULTS") {
                $("#showAddress").text("Company address cannot be identified - please contact job poster for further details.");
                return;
            }
            else {



                var lat = response.candidates[0].geometry.location.lat;
                var long = response.candidates[0].geometry.location.lng;
                var compAddress = response.candidates[0].formatted_address;
                $("#showAddress").text("Showing results for places near: " + compAddress);
            }

            // this is to get restaurants nearby
            var queryNearbyLookupURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + long + "&radius=1500&type=restaurant&key=" + googleKey;

            $.ajax({
                url: queryNearbyLookupURL,
                method: "GET",

            }).then(function (response) {
                console.log("GooglePlacesNearby: " + JSON.stringify(response));

                var name = "";
                var nameLink = ""; //new
                var nameText = ""; //new
                var rating = "";
                var user_ratings_total = "";
                var place_id = ""; //need this to get detailed info including opening hours
                var price_level = "";
                var vicinity = "";

                for (var i = 0; i < 5; i++) {
                    name = response.results[i].name;
                    nameLink = $('<a href="#">' + response.results[i].name + " " + "</a>");
                    nameText = $('<p style="display:inline-block">' + " " + " | Rating: " + rating + " | No. of ratings: " + user_ratings_total + "</p>")
                    rating = response.results[i].rating;
                    user_ratings_total = response.results[i].user_ratings_total;
                    place_id = response.results[i].place_id;
                    price_level = response.results[i].price_level;
                    vicinity = response.results[i].vicinity;
                    restaurantResults.push({ name: name, rating: rating, total_ratings: user_ratings_total, id: place_id, price: price_level, vicinity: vicinity });

                    var newLi = $('<li style="list-style-type: none;">'); //new
                    newLi.append(nameLink, nameText); //new
                    // newLi.text(" | Rating: " + rating + " | No. of ratings: " + user_ratings_total);
                    nameLink.attr("data-value", name + " " + vicinity); //new
                    nameLink.addClass("placeNearby"); //new
                    $("#restListEl").append(newLi);
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
                var nameLink = ""; //new
                var nameText = ""; //new
                var rating = "";
                var user_ratings_total = "";
                var place_id = ""; //need this to get detailed info including opening hours
                var price_level = "";
                var vicinity = "";

                for (var i = 0; i < 5; i++) {
                    name = response.results[i].name;
                    nameLink = $('<a href="#">' + response.results[i].name + " " + "</a>");
                    nameText = $('<p style="display:inline-block">' + " " + " | Rating: " + rating + " | No. of ratings: " + user_ratings_total + "</p>")
                    rating = response.results[i].rating;
                    user_ratings_total = response.results[i].user_ratings_total;
                    place_id = response.results[i].place_id;
                    price_level = response.results[i].price_level;
                    vicinity = response.results[i].vicinity;
                    cafeResults.push({ name: name, rating: rating, total_ratings: user_ratings_total, id: place_id, price: price_level, vicinity: vicinity });

                    var newLi = $('<li style="list-style-type: none;">'); //new
                    newLi.append(nameLink, nameText); //new
                    // newLi.text(" | Rating: " + rating + " | No. of ratings: " + user_ratings_total);
                    nameLink.attr("data-value", name + " " + vicinity); //new
                    nameLink.addClass("placeNearby"); //new
                    $("#cafeListEl").append(newLi);
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
                var nameLink = ""; //new
                var nameText = ""; //new
                var rating = "";
                var user_ratings_total = "";
                var place_id = ""; //need this to get detailed info including opening hours
                var price_level = "";
                var vicinity = "";

                for (var i = 0; i < 5; i++) {
                    name = response.results[i].name;
                    nameLink = $('<a href="#">' + response.results[i].name + " " + "</a>");
                    nameText = $('<p style="display:inline-block">' + " " + " | Rating: " + rating + " | No. of ratings: " + user_ratings_total + "</p>")
                    rating = response.results[i].rating;
                    user_ratings_total = response.results[i].user_ratings_total;
                    place_id = response.results[i].place_id;
                    price_level = response.results[i].price_level;
                    vicinity = response.results[i].vicinity;
                    barResults.push({ name: name, rating: rating, total_ratings: user_ratings_total, id: place_id, price: price_level, vicinity: vicinity });

                    var newLi = $('<li style="list-style-type: none;">'); //new
                    newLi.append(nameLink, nameText); //new
                    // newLi.text(" | Rating: " + rating + " | No. of ratings: " + user_ratings_total);
                    nameLink.attr("data-value", name + " " + vicinity); //new
                    nameLink.addClass("placeNearby"); //new
                    $("#barListEl").append(newLi);
                }
                console.log(barResults);
            })
        })

    })

    companyDisplayEl4.click(function () {
        i = companyDisplayEl4.data("value")

        var jobDescriptionDisplay = $("#jobDescriptionEl");
        jobDescriptionDisplay.html("")
        jobDescriptionDisplay.append("<h1>" + companyResults[i].company + "</h1>, " + "<h2>" + companyResults[i].location + "</h2>");
        jobDescriptionDisplay.append("<h2>" + companyResults[i].title + "</h2>");

        jobDescriptionDisplay.append("<p>" + companyResults[i].description + "</p>");
        gitJobInput = companyResults[i].company + "+" + companyResults[i].location.trim()
        var replaced = gitJobInput.split(' ').join('+');
        var replaced2 = replaced.split('#').join('+');

        console.log(gitJobInput)
        console.log("replaced2: " + replaced2)
        $("#restListEl").html("");
        $("#cafeListEl").html("");
        $("#barListEl").html("");
        $("#showAddress").text("");
        restaurantResults = [];
        cafeResults = [];
        barResults = [];


        var queryCompanyLookupURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + replaced2 + "&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=" + googleKey

        $.ajax({
            url: queryCompanyLookupURL,
            method: "GET",

        }).then(function (response) {
            console.log("GooglePlaces: " + JSON.stringify(response));
            console.log("GooglePlaces: " + queryCompanyLookupURL);
            console.log("response: " + response.status)

            if (response.status === "ZERO_RESULTS") {
                $("#showAddress").text("Company address cannot be identified - please contact job poster for further details.");
                return;
            }
            else {



                var lat = response.candidates[0].geometry.location.lat;
                var long = response.candidates[0].geometry.location.lng;
                var compAddress = response.candidates[0].formatted_address;
                $("#showAddress").text("Showing results for places near: " + compAddress);
            }

            // this is to get restaurants nearby
            var queryNearbyLookupURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + long + "&radius=1500&type=restaurant&key=" + googleKey;

            $.ajax({
                url: queryNearbyLookupURL,
                method: "GET",

            }).then(function (response) {
                console.log("GooglePlacesNearby: " + JSON.stringify(response));

                var name = "";
                var nameLink = ""; //new
                var nameText = ""; //new
                var rating = "";
                var user_ratings_total = "";
                var place_id = ""; //need this to get detailed info including opening hours
                var price_level = "";
                var vicinity = "";

                for (var i = 0; i < 5; i++) {
                    name = response.results[i].name;
                    nameLink = $('<a href="#">' + response.results[i].name + " " + "</a>");
                    nameText = $('<p style="display:inline-block">' + " " + " | Rating: " + rating + " | No. of ratings: " + user_ratings_total + "</p>")
                    rating = response.results[i].rating;
                    user_ratings_total = response.results[i].user_ratings_total;
                    place_id = response.results[i].place_id;
                    price_level = response.results[i].price_level;
                    vicinity = response.results[i].vicinity;
                    restaurantResults.push({ name: name, rating: rating, total_ratings: user_ratings_total, id: place_id, price: price_level, vicinity: vicinity });

                    var newLi = $('<li style="list-style-type: none;">'); //new
                    newLi.append(nameLink, nameText); //new
                    // newLi.text(" | Rating: " + rating + " | No. of ratings: " + user_ratings_total);
                    nameLink.attr("data-value", name + " " + vicinity); //new
                    nameLink.addClass("placeNearby"); //new
                    $("#restListEl").append(newLi);
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
                var nameLink = ""; //new
                var nameText = ""; //new
                var rating = "";
                var user_ratings_total = "";
                var place_id = ""; //need this to get detailed info including opening hours
                var price_level = "";
                var vicinity = "";

                for (var i = 0; i < 5; i++) {
                    name = response.results[i].name;
                    nameLink = $('<a href="#">' + response.results[i].name + " " + "</a>");
                    nameText = $('<p style="display:inline-block">' + " " + " | Rating: " + rating + " | No. of ratings: " + user_ratings_total + "</p>")
                    rating = response.results[i].rating;
                    user_ratings_total = response.results[i].user_ratings_total;
                    place_id = response.results[i].place_id;
                    price_level = response.results[i].price_level;
                    vicinity = response.results[i].vicinity;
                    cafeResults.push({ name: name, rating: rating, total_ratings: user_ratings_total, id: place_id, price: price_level, vicinity: vicinity });

                    var newLi = $('<li style="list-style-type: none;">'); //new
                    newLi.append(nameLink, nameText); //new

                    nameLink.attr("data-value", name + " " + vicinity); //new
                    nameLink.addClass("placeNearby"); //new
                    $("#cafeListEl").append(newLi);
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
                var nameLink = ""; //new
                var nameText = ""; //new
                var rating = "";
                var user_ratings_total = "";
                var place_id = ""; //need this to get detailed info including opening hours
                var price_level = "";
                var vicinity = "";

                for (var i = 0; i < 5; i++) {
                    name = response.results[i].name;
                    nameLink = $('<a href="#">' + response.results[i].name + " " + "</a>");
                    nameText = $('<p style="display:inline-block">' + " " + " | Rating: " + rating + " | No. of ratings: " + user_ratings_total + "</p>")
                    rating = response.results[i].rating;
                    user_ratings_total = response.results[i].user_ratings_total;
                    place_id = response.results[i].place_id;
                    price_level = response.results[i].price_level;
                    vicinity = response.results[i].vicinity;
                    barResults.push({ name: name, rating: rating, total_ratings: user_ratings_total, id: place_id, price: price_level, vicinity: vicinity });

                    var newLi = $('<li style="list-style-type: none;">'); //new
                    newLi.append(nameLink, nameText); //new

                    nameLink.attr("data-value", name + " " + vicinity); //new
                    nameLink.addClass("placeNearby"); //new
                    $("#barListEl").append(newLi);
                }
                console.log(barResults);
            })
        })


    })


    companyDisplayEl5.click(function () {
        i = companyDisplayEl5.data("value")
        var jobDescriptionDisplay = $("#jobDescriptionEl");
        jobDescriptionDisplay.html("")
        jobDescriptionDisplay.append("<h1>" + companyResults[i].company + "</h1>, " + "<h2>" + companyResults[i].location + "</h2>");
        jobDescriptionDisplay.append("<h2>" + companyResults[i].title + "</h2>");

        jobDescriptionDisplay.append("<p>" + companyResults[i].description + "</p>");
        gitJobInput = companyResults[i].company + "+" + companyResults[i].location.trim()
        var replaced = gitJobInput.split(' ').join('+');
        var replaced2 = replaced.split('#').join('+');

        console.log(gitJobInput)
        console.log("replaced: " + replaced)
        $("#restListEl").html("");
        $("#cafeListEl").html("");
        $("#barListEl").html("");
        $("#showAddress").text("");
        restaurantResults = [];
        cafeResults = [];
        barResults = [];


        var queryCompanyLookupURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + replaced2 + "&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=" + googleKey

        $.ajax({
            url: queryCompanyLookupURL,
            method: "GET",

        }).then(function (response) {
            console.log("GooglePlaces: " + JSON.stringify(response));
            console.log("GooglePlaces: " + queryCompanyLookupURL);
            console.log("response: " + response.status)

            if (response.status === "ZERO_RESULTS") {
                $("#showAddress").text("Company address cannot be identified - please contact job poster for further details.");
                return;
            }
            else {



                var lat = response.candidates[0].geometry.location.lat;
                var long = response.candidates[0].geometry.location.lng;
                var compAddress = response.candidates[0].formatted_address;
                $("#showAddress").text("Showing results for places near: " + compAddress);
            }

            // this is to get restaurants nearby
            var queryNearbyLookupURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + long + "&radius=1500&type=restaurant&key=" + googleKey;

            $.ajax({
                url: queryNearbyLookupURL,
                method: "GET",

            }).then(function (response) {
                console.log("GooglePlacesNearby: " + JSON.stringify(response));

                var name = "";
                var nameLink = ""; //new
                var nameText = ""; //new
                var rating = "";
                var user_ratings_total = "";
                var place_id = ""; //need this to get detailed info including opening hours
                var price_level = "";
                var vicinity = "";

                for (var i = 0; i < 5; i++) {
                    name = response.results[i].name;
                    nameLink = $('<a href="#">' + response.results[i].name + " " + "</a>");
                    nameText = $('<p style="display:inline-block">' + " " + " | Rating: " + rating + " | No. of ratings: " + user_ratings_total + "</p>")
                    rating = response.results[i].rating;
                    user_ratings_total = response.results[i].user_ratings_total;
                    place_id = response.results[i].place_id;
                    price_level = response.results[i].price_level;
                    vicinity = response.results[i].vicinity;
                    restaurantResults.push({ name: name, rating: rating, total_ratings: user_ratings_total, id: place_id, price: price_level, vicinity: vicinity });

                    var newLi = $('<li style="list-style-type: none;">'); //new
                    newLi.append(nameLink, nameText); //new

                    nameLink.attr("data-value", name + " " + vicinity); //new
                    nameLink.addClass("placeNearby"); //new
                    $("#restListEl").append(newLi);
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
                var nameLink = ""; //new
                var nameText = ""; //new
                var rating = "";
                var user_ratings_total = "";
                var place_id = ""; //need this to get detailed info including opening hours
                var price_level = "";
                var vicinity = "";

                for (var i = 0; i < 5; i++) {
                    name = response.results[i].name;
                    nameLink = $('<a href="#">' + response.results[i].name + " " + "</a>");
                    nameText = $('<p style="display:inline-block">' + " " + " | Rating: " + rating + " | No. of ratings: " + user_ratings_total + "</p>")
                    rating = response.results[i].rating;
                    user_ratings_total = response.results[i].user_ratings_total;
                    place_id = response.results[i].place_id;
                    price_level = response.results[i].price_level;
                    vicinity = response.results[i].vicinity;
                    cafeResults.push({ name: name, rating: rating, total_ratings: user_ratings_total, id: place_id, price: price_level, vicinity: vicinity });

                    var newLi = $('<li style="list-style-type: none;">'); //new
                    newLi.append(nameLink, nameText); //new

                    nameLink.attr("data-value", name + " " + vicinity); //new
                    nameLink.addClass("placeNearby"); //new
                    $("#cafeListEl").append(newLi);
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
                var nameLink = ""; //new
                var nameText = ""; //new
                var rating = "";
                var user_ratings_total = "";
                var place_id = ""; //need this to get detailed info including opening hours
                var price_level = "";
                var vicinity = "";

                for (var i = 0; i < 5; i++) {
                    name = response.results[i].name;
                    nameLink = $('<a href="#">' + response.results[i].name + " " + "</a>");
                    nameText = $('<p style="display:inline-block">' + " " + " | Rating: " + rating + " | No. of ratings: " + user_ratings_total + "</p>")
                    rating = response.results[i].rating;
                    user_ratings_total = response.results[i].user_ratings_total;
                    place_id = response.results[i].place_id;
                    price_level = response.results[i].price_level;
                    vicinity = response.results[i].vicinity;
                    barResults.push({ name: name, rating: rating, total_ratings: user_ratings_total, id: place_id, price: price_level, vicinity: vicinity });

                    var newLi = $('<li style="list-style-type: none;">'); //new
                    newLi.append(nameLink, nameText); //new

                    nameLink.attr("data-value", name + " " + vicinity); //new
                    nameLink.addClass("placeNearby"); //new
                    $("#barListEl").append(newLi);
                }
                console.log(barResults);
            })
        })

    })

    // }

    var placeName;
    var placeInfo = [];


    // this is to get additional information of places nearby


    var formatted_address = "";
    var name = "";
    var opening_hours = "";
    var photos = "";



    $(document).on("click", ".placeNearby", placesNearby);


    function placesNearby(event) {
        if (event.target.matches("a")) {
            placeName = $(this).attr("data-value");
            console.log($(this).attr("data-value"))
            var replaced = placeName.split("#").join('+');
            var replaced2 = replaced.split(' ').join('+');

            console.log("This check: " + replaced2);

            var queryPlaceLookupURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + replaced2 + "&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=" + googleKey;
            console.log("first check URL placenearby: " + queryPlaceLookupURL)

            $.ajax({
                url: queryPlaceLookupURL,
                method: "GET",

            }).then(function (response) {
                console.log("check URL placenearby: " + queryPlaceLookupURL)
                console.log("Place Nearby Check: " + JSON.stringify(response));
                formatted_address = response.candidates[0].formatted_address;
                name = response.candidates[0].name;
                photos = response.candidates[0].photos[0].photo_reference;
                rating = response.candidates[0].rating;


                $("#jobDescriptionEl").html("");
                var detailName = $('<h2 class="work-feature-block-header">' + name + '</h2>');
                var placePhoto = $('<img style= "margin: 25px 0">');
                placePhoto.attr("src", "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + photos + "&key=" + googleKey);
                var placeAddress = $("<p>" + formatted_address + "</p>");
                var placeRating = $("<p>Rating: " + rating + "</p>");

                $("#jobDescriptionEl").append(detailName, placePhoto, placeAddress, placeRating);


            }
            )


        }

    }

    // 3rd party API
    var cardSection = document.getElementsByClassName("card-section");
    for (let i = 0; i < cardSection.length; i++) {
        cardSection[i].onclick = function () {
            toastr.success("Great choice!");
        }
    };

})







