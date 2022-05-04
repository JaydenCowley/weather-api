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
var DateTime = luxon.DateTime;
var today = DateTime.local;
console.log(DateTime.local().c.day);
var CurrentDayOfMonth = DateTime.local().c.day;
var CurrentMonth = DateTime.local().c.month;
var CurrentYear = DateTime.local().c.year;
console.log(CurrentMonth + "/" + CurrentDayOfMonth + "/" + CurrentYear) 
//Get all the information we need from the Api's()
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
            var currentCity = data[0].name + ", " + data[0].state
            document.getElementById("current-city").textContent = currentCity
            //Requesting the weather data using the lat an lon provided by the last request
            var requestWeatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey
            fetch(requestWeatherUrl)
                .then(function (response) {
                    console.log(response)
                    return response.json();
                })
                .then(function (data) {
                    console.log(data)
                    //Adding collected data to the html
                    //Current
                    document.getElementById("current-date").textContent = (CurrentMonth + "/" + CurrentDayOfMonth + "/" + CurrentYear);
                    document.getElementById("current-temp").textContent = ("Temp: " + data.current.temp + "ºF");
                    document.getElementById("current-wind").textContent = ("Wind Speed: " + data.current.wind_speed + "mph");
                    document.getElementById("current-humidity").textContent = ("Humidity: " + data.current.humidity + "%");
                    document.getElementById("current-uv").textContent = ("UV index: " + data.current.uvi);
                    //Day 1
                    document.getElementById("day-1-date").textContent = (CurrentMonth + "/" + CurrentDayOfMonth + 1 + "/" + CurrentYear);
                    document.getElementById("day-1-temp").textContent = ("Temp: " + data.daily[0].temp.day + "ºF");
                    document.getElementById("day-1-wind").textContent = ("Wind Speed: " + data.daily[0].wind_speed + "mph");
                    document.getElementById("day-1-humidity").textContent = ("Humidity: " + data.daily[0].humidity + "%");
                    //Day 2
                    document.getElementById("day-2-date").textContent = (CurrentMonth + "/" + CurrentDayOfMonth + 2 + "/" + CurrentYear);
                    document.getElementById("day-2-temp").textContent = ("Temp: " + data.daily[1].temp.day + "ºF");
                    document.getElementById("day-2-wind").textContent = ("Wind Speed: " + data.daily[1].wind_speed + "mph");
                    document.getElementById("day-2-humidity").textContent = ("Humidity: " + data.daily[1].humidity + "%");
                    // Day 3
                    document.getElementById("day-3-date").textContent = (CurrentMonth + "/" + CurrentDayOfMonth + 3 + "/" + CurrentYear);
                    document.getElementById("day-3-temp").textContent = ("Temp: " + data.daily[2].temp.day + "ºF");
                    document.getElementById("day-3-wind").textContent = ("Wind Speed: " + data.daily[2].wind_speed + "mph");
                    document.getElementById("day-3-humidity").textContent = ("Humidity: " + data.daily[2].humidity + "%");
                    // Day 4
                    document.getElementById("day-4-date").textContent = (CurrentMonth + "/" + CurrentDayOfMonth + 4 + "/" + CurrentYear);
                    document.getElementById("day-4-temp").textContent = ("Temp: " + data.daily[3].temp.day + "ºF");
                    document.getElementById("day-4-wind").textContent = ("Wind Speed: " + data.daily[3].wind_speed + "mph");
                    document.getElementById("day-4-humidity").textContent = ("Humidity: " + data.daily[3].humidity + "%");
                    // Day 5
                    document.getElementById("day-5-date").textContent = (CurrentMonth + "/" + CurrentDayOfMonth + 5 + "/" + CurrentYear);
                    document.getElementById("day-5-temp").textContent = ("Temp: " + data.daily[4].temp.day + "ºF");
                    document.getElementById("day-5-wind").textContent = ("Wind Speed: " + data.daily[4].wind_speed + "mph");
                    document.getElementById("day-5-humidity").textContent = ("Humidity: " + data.daily[4].humidity + "%");
                })
        });
};
