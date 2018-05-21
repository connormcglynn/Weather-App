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

// console.log(geolocation);

window.onload = function() {
    getLocation();
  };