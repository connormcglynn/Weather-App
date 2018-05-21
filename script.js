/*global $*/
$(document).ready(function() {
    var allQuotes = $("blockquote");
    var currentQuote = 0;

    function changeQuote(){
        $(allQuotes[currentQuote]).fadeOut(400, function(){
            if (currentQuote == allQuotes.length - 1) {
                currentQuote = 0;
            } else {
                currentQuote++;
            }
    
            $(allQuotes[currentQuote]).fadeIn(400);
        });
    }

    var quoteTimer = setInterval(changeQuote, 4000);

});

const loc = document.getElementById("location");
const tempNum = document.getElementById("temperature-num");
const tempScale = document.getElementById("temperature-scale");
const weatherCond = document.getElementById("weather-condition");
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
        .catch(function(err) {
            console.error(err);
          });
};


// Run the function to get user's geolocation
window.onload = function() {
    getLocation();
  };

// Update the data from API to DOM
function updateDataToUI(location, weather, temp) {
    weatherIcon.innerHTML = `<img src="${weather[0].icon}" />`;
    weatherCond.innerHTML = weather[0].main;
    loc.innerHTML = location;
    tempNum.innerHTML = `${temp}`;
  }

