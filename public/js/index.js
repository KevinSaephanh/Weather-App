const weather = new Weather();

window.onload = () => {
    const coordinates = getCurrentLocation();
    weather.getWeather(coordinates).then((data) => {
        updateWeather(data);
    }).catch((err) => {
        alert(err);
    });
};

document.querySelector(".btn").addEventListener("click", () => {
    let searchInput = document.getElementById("searchText").value;
    weather.getWeather(searchInput).then((data) => {
        updateWeather(data);
    }).catch((err) => {
        alert(err);
    });
});

document.querySelector(".form-location").addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        e.preventDefault();
        let searchInput = document.getElementById("searchText").value;
        weather.getWeather(searchInput).then((data) => {
            updateWeather(data);
        }).catch((err) => {
            alert(err);
        });
    }
}, false);

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            coordinates = position.coords.latitude + " " + position.coords.longitude;
            return coordinates;
        });
    } else
        console.log("Geolocation is not supported by your browser");
}

function updateWeather(data) {
    let tempF = Math.round(((parseFloat(data.main.temp) - 273.15) * (9 / 5)) + 32);
    let tempC = Math.round(parseFloat(data.main.temp) - 273.15);

    alert("GOT IT");
    document.getElementById("location").innerHTML = data.name + ", " + data.sys.country;
    document.getElementById("time").innerHTML = data.dt;
    document.getElementById("weatherDesc").innerHTML = data.weather[0].description;
    document.getElementById("temp").innerHTML = tempF + "&deg;" + "/" + tempC + "&deg";
    document.getElementById("humidity").innerHTML = "Humidity: " + data.main.humidity;
    document.getElementById("wind").innerHTML = "Wind: " + data.wind.speed;
}