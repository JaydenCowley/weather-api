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
    var cityName = document.getElementById("city-name").value;
    var countryName = document.getElementById("country-name").value;
    var stateName = document.getElementById("state-name").value;
    //document.createElement("li").setAttribute("class", "list-item")
    //document.getElementById("list-item") = cityName + ", " + stateName + ", " + countryName

    //document.getElementById("city-list").appendChild("li", cityName).setAttribute("class","city-list-item");
    //localStorage.setItem(cityName, "City Name");
    getWeatherApi();

});
var DateTime = luxon.DateTime;
//console.log(DateTime);
var today = DateTime.local();
console.log(DateTime.local().c.day);
console.log(today)
console.log(DateTime.fromMillis(1651936793961));
var getDate = function (millis) {
    millis = millis * 1000
    //console.log(millis)
    //console.log(DateTime.fromMillis(millis).c.month + "/" + DateTime.fromMillis(millis).c.day + "/" + DateTime.fromMillis(millis).c.year)
    return DateTime.fromMillis(millis).c.month + "/" + DateTime.fromMillis(millis).c.day + "/" + DateTime.fromMillis(millis).c.year
}
var getIcon = function (iconId) {
    var img = "http://openweathermap.org/img/wn/" + iconId + "@2x.png"
    return img
}


//Get all the information we need from the Api's()
async function getWeatherApi() {
    var cityName = document.getElementById("city-name").value;
    var countryName = document.getElementById("country-name").value;
    var stateName = document.getElementById("state-name").value;
    // Requesting the lat and lon of the entered city
    var requestLatLonUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "," + stateName + "," + countryName + "&limit=5&appid=" + apiKey
    await fetch(requestLatLonUrl)
        .then(function (response) {
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

                    return response.json();
                })
                .then(function (data) {

                    console.log(data)
                    document.getElementById("current-date").textContent = getDate(data.current.dt)
                    document.getElementById("current-icon").src = getIcon(data.current.weather[0].icon)
                    document.getElementById("current-temp").textContent = ("Temp: " + data.current.temp + "ºF");
                    document.getElementById("current-wind").textContent = ("Wind Speed: " + data.current.wind_speed + "mph");
                    document.getElementById("current-humidity").textContent = ("Humidity: " + data.current.humidity + "%");
                    document.getElementById("current-uv").textContent = ("UV index: " + data.current.uvi);
                    if (data.current.uvi < 0) {
                        document.getElementById("current-uv").style.backgroundColor = "green";
                    }
                    else if (data.current.uvi < 3) {
                        document.getElementById("current-uv").style.backgroundColor = "green";
                    }
                    else if (data.current.uvi < 5) {
                        document.getElementById("current-uv").style.backgroundColor = "yellow";
                    }
                    else if (data.current.uvi < 8) {
                        document.getElementById("current-uv").style.backgroundColor = "orange";
                    }
                    else (document.getElementById("current-uv").style.backgroundColor = "red");
                    console.log(data.daily[1].weather[0].icon)


                    for (let i = 1; i < 6; i++) {
                        document.getElementById("day-" + i + "-date").textContent = getDate(data.daily[i].dt)
                        document.getElementById("icon-" + i).src = getIcon(data.daily[i].weather[0].icon)
                        document.getElementById("day-" + i + "-temp").textContent = "Temp: " + data.daily[i - 1].temp.day + "ºF";
                        document.getElementById("day-" + i + "-wind").textContent = "Wind Speed: " + data.daily[i - 1].wind_speed + "mph";
                        document.getElementById("day-" + i + "-humidity").textContent = "Humidity: " + data.daily[i - 1].humidity + "%";
                    }
                })
        });
};
