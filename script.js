/*global $*/

// cycle through potential weather quotes
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

// set up variables for JSON population

const loc = document.getElementById("location");
const tempNum = document.getElementById("temperature-num");
const tempScale = document.getElementById("temperature-scale");
const weatherCond = document.getElementById("weather-condition");
const weatherIcon = document.getElementById("weather-icon");

// get user's geolocation & change the background 

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

// Once geolocation is acquired, get weather for that location

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

          function backgroundCycle (){
            if ($("#weather-condition").text() == "Clouds" || "Clear"){
                $("body").css("background-image", "url(./images/clouds.jpg)");
                $(document).ready(function() {
                    var pixelToMove = 50;
                    $("background-image").mousemove(function(e) {
                    var width = $(this).innerWidth();
                    var height = $(this).innerHeight();
                    var newValueX = (e.pageX / width) * pixelToMove;
                    var newValueY = (e.pageY / height) * pixelToMove;
                    $(this).css('background-position', newValueX + '%' + ' ' + newValueY + '%');
                    });
                    });
            } else {
                $("body").css("background-color", "black");
                }
            }
        
            backgroundCycle();
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
  };

// Parallax background on mousemove

// $("body").mousemove(function(e) {
//     parallaxIt(e, ".slide", -100);
//     parallaxIt(e, "img", -30);
//   });
  
//   function parallaxIt(e, target, movement) {
//     var $this = $("body");
//     var relX = e.pageX - $this.offset().left;
//     var relY = e.pageY - $this.offset().top;
  
//     TweenMax.to(target, 1, {
//       x: (relX - $this.width() / 2) / $this.width() * movement,
//       y: (relY - $this.height() / 2) / $this.height() * movement
//     });
//   }

(function($){
    $.fn.backgroundMove = function (options) {
        var defaults = {movementStrength:'50'}
        var options = $.extend(defaults,options);
        var $this = $(this);
        var movementStrength = options.movementStrength;
        var height = movementStrength / $(window).height();
        var width = movementStrength / $(window).width();
        
        $this.mousemove(function(e){
        var pageX = e.pageX - ($(window).width() / 2);
        var pageY = e.pageY - ($(window).height() / 2);
        var newvalueX = width * pageX * -1 - 25;
        var newvalueY = height * pageY * -1 - 50;
                $this.css("background-position", newvalueX+"px     "+newvalueY+"px");
        });

    }
})(jQuery);
$('body').backgroundMove({
                movementStrength:'50'
            });

            var scene = document.getElementById('scene');
            var parallaxInstance = new Parallax(scene);