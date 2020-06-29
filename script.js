$(document).ready(function () {

    // these are the input fields to search GitHub jobs
    var userJobDescription = "";
    var userLocation = "";
    var userFullTime = "";

    // this is where we push job search results to
    var companyResults = [];

    // these are the placeholders for displaying the query results in HTML (i.e. we need to add ids to the relevant elements)
    var companyDisplayEl1 = "";
    var companyDisplayEl2 = "";
    var companyDisplayEl3 = "";
    var companyDisplayEl4 = "";
    var companyDisplayEl5 = "";

    var companyDisplayElAll = [companyDisplayEl1,companyDisplayEl2,companyDisplayEl3,companyDisplayEl4,companyDisplayEl5];

    var locationDisplayEl1 = "";
    var locationDisplayEl2 = "";
    var locationDisplayEl3 = "";
    var locationDisplayEl4 = "";
    var locationDisplayEl5 = "";

    var locationDisplayElAll = [locationDisplayEl1,locationDisplayEl2,locationDisplayEl3,locationDisplayEl4,locationDisplayEl5];
    
    var titleDisplayEl1 = "";
    var titleDisplayEl2 = "";
    var titleDisplayEl3 = "";
    var titleDisplayEl4 = "";
    var titleDisplayEl5 = "";

    var titleDisplayElAll = [titleDisplayEl1,titleDisplayEl2,titleDisplayEl3,titleDisplayEl4,titleDisplayEl5];


    // this is a placeholder for testing purposes (to see what we generate with inputs)
    test();

    function test(){
        userJobDescription = "javascript";
        userLocation = "san jose";
        userFullTime = "yes";
    }

    // this is a placeholder for the ajax connection for GitHub jobs (to be moved under submit button on click once html is ready)

    var queryURL = "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description="+userJobDescription+"&location="+userLocation+"&full_time="+userFullTime;
    $.ajax({
        url: queryURL,
        method: "GET",

    }).then(function (response) {
        console.log("GitHub: "+JSON.stringify(response));
        console.log("Company: "+response[0].company);
        console.log("Location: "+response[0].location);
        console.log("Title: "+response[0].title);

        // pushes first 5 results into var companyResults
        var company = "";
        var location = "";
        var title = "";
        for (var i = 0; i < 5; i++){
            company = response[i].company;
            location = response[i].location;
            title = response[i].title;
            companyResults.push({company: company, location: location, title: title});
        }

        console.log(companyResults)

        console.log(companyResults[0].company);
        console.log(companyResults[0].location);
        console.log(companyResults[0].title);

        // populates html elements with company, location, and title for first 5 results
        for (var i = 0; i < 5; i++){
            companyDisplayElAll[i].text(companyResults[i].company);
            locationDisplayElAll[i].text(companyResults[i].location);
            titleDisplayElAll[i].text(companyResults[i].title);
        }

    })

})