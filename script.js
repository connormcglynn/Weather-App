/*global $*/
$(document).ready(function() {
    $("div").on("click", function(){
        $(this).animate({"opacity" : "0.5"})
    });
});

const loc = document.getElementById("location");
const temNum = document.getElementById("temperature-num");
const temScale = document.getElementById("temperature-scale");
const weatherCon = document.getElementById("weather-condition");
const weatherIcon = document.getElementById("weather-icon");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            getWeather(position.coords.latitude,
                       position.coords.longitude);
        });
    } else {
        loc.innerHTML = "Could not get geolocation from browser."
    }
}

function getWeather(lat, lon) {
    const api = "https://fcc-weather-api.glitch.me/api/current?";
    fetch(`${api}lat=${lat}&lon=${lon}`, {method: "get"})
        .then(resp => resp.json())
        .then(data => {
            updateDataToUI(data.name, data.weather, data.main.temp);
        })
        if (err) throw err;
            console.log(err);
};


// Run the function to get user's geolocation
window.onload = function() {
    getLocation();
  };

// Update the data from API to DOM
function updateDataToUI(location, weather, temp) {
    weatherIcon.innerHTML = `<img src="${weather[0].icon}" />`;
    weatherCon.innerHTML = weather[0].main;
    loc.innerHTML = location;
    temNum.innerHTML = `${temp}`;
  }