// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
//API key: dd5b88dda79c76158757fafce663aa41
//weather retrieval: https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=dd5b88dda79c76158757fafce663aa41
//lat lon retrieval: http://api.openweathermap.org/geo/1.0/direct?q={city name}&limit=5&appid=dd5b88dda79c76158757fafce663aa41
//defined variables
const apiKey = "dd5b88dda79c76158757fafce663aa41";
// submit button function
document.getElementById("city-submit").addEventListener("click", function () {


    // document.getElementById("city-list").appendChild("li", cityName).setAttribute("class","city-list-item");
    //localStorage.setItem(cityName, "City Name");
    getWeatherApi();
    //getWeatherApi();


});


//getLatLonApi()
async function getWeatherApi() {
    var cityName = document.getElementById("city-name").value;
    var countryName = document.getElementById("country-name").value;
    var stateName = document.getElementById("state-name").value;
    // Requesting the lat and lon of the entered city
    var requestLatLonUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "," + stateName + "," + countryName + "&limit=5&appid=" + apiKey
    await fetch(requestLatLonUrl)
        .then(function (response) {
            console.log(response)

            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log("lat: " + data[0].lat + ", " + "lon: " + data[0].lon);
            var lat = data[0].lat;
            var lon = data[0].lon;
            //Requesting the weather data using the lat an lon provided by the last request
            var requestWeatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey
            fetch(requestWeatherUrl)
                .then(function (response) {
                    console.log(response)
                    return response.json();
                })
                .then(function (data) {
                    console.log(data)
                })
                //Adding collected data to the html
                .then(function(data) {
                })
        });
};
