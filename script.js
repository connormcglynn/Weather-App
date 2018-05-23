// cycle through bro weather quotes
$(document).ready(function() {
    var allQuotes = $("blockquote");
    var currentQuote = 0;

    function changeQuote(){
        $(allQuotes[currentQuote]).fadeOut(400, function(){
            if (currentQuote == allQuotes.length - 1) {
                currentQuote = 0;
            } else {
                currentQuote++;
            }   $(allQuotes[currentQuote]).fadeIn(400);
        });
    };

    var quoteTimer = setInterval(changeQuote, 4000);
});

// set up variables for JSON population
const loc = document.getElementById("location");
const tempNum = document.getElementById("temperature-num");
const tempScale = document.getElementById("temperature-scale");
const weatherCond = document.getElementById("weather-condition");
const weatherIcon = document.getElementById("weather-icon");

// get user's geolocation 
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            getWeather(position.coords.latitude, position.coords.longitude);
        });
    } else {
        loc.innerHTML = "Could not get geolocation from browser."
    }
}

// Run the function to get user's geolocation
window.onload = function() {
    getLocation();
};

// Once geolocation is acquired, get weather for that location
function getWeather(lat, lon) {
    const api = "https://fcc-weather-api.glitch.me/api/current?";
    fetch(`${api}lat=${lat}&lon=${lon}`, {method: "get"})
        .then(resp => resp.json())
        .then(data => {
            updateDataToUI(data.name, data.weather, data.main.temp);
        })
        .catch(function(err) {
            console.log(err);
        });
};

// Update the data from API to DOM
function updateDataToUI(location, weather, temp) {
    weatherIcon.innerHTML = `<img src="${weather[0].icon}" />`;
    weatherCond.innerHTML = weather[0].main;
    loc.innerHTML = location;
    tempNum.innerHTML = `${temp}`;

    // Celsius --> Fahrenheit toggle
    $(".btn").click(function(){
        var celsius = temp;
        var fahrenheit = ((celsius*1.8) + 32);
        var degrees = $("#temperature-num").text();
        if (degrees == celsius) {
            $("#temperature-num").text(fahrenheit.toFixed(2)) && $(this).html('Convert to °C');
        } else {
            return $("#temperature-num").text(celsius.toFixed(2)) && $(this).html('Convert to °F');
        }   
    });
};

// Background motion on mousemove
function backgroundMover() {
    $.fn.cursorMove = function (options) {
        var defaults = { movementStrength: '50' };
        var options = $.extend(defaults, options);
        var movementStrength = options.movementStrength;
        var height = movementStrength / $(window).height();
        var width = movementStrength / $(window).width();
        
        $(this).mousemove(function (e) {
            var pageX = e.pageX - ($(window).width() / 2);
            var pageY = e.pageY - ($(window).height() / 2);
            var newvalueX = width * pageX * -1 - 25;
            var newvalueY = height * pageY * -1 - 50;
            $(this).css("background-position", newvalueX + "px " + newvalueY + "px");
        });
    };
};

// call the functions
backgroundMover($);
$('body').cursorMove({
    movementStrength:'15'
});

