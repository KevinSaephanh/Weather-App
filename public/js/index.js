const weather = new Weather();

window.onload = () => {
    getCurrentLocation();
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
        let searchInput = document.getElementById("searchText").value;
        e.preventDefault();

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
            const lat = parseFloat(Math.round(position.coords.latitude * 100) / 100).toFixed(2);
            const lon = parseFloat(Math.round(position.coords.longitude * 100) / 100).toFixed(2);
            const coordinates = lat + "/" + lon;

            weather.getWeather(coordinates).then((data) => {
                updateWeather(data);
            });
        });
    } else
        console.log("Geolocation is not supported by your browser");
}

function updateWeather(data) {
    //Variables for html elements
    const location = document.getElementById("location");
    const time = document.getElementById("time");
    const weatherMain = document.getElementById("weatherMain");
    const weatherImg = document.getElementById("weatherImg");
    const temp = document.getElementById("temp");
    const humidity = document.getElementById("humidity");
    const wind = document.getElementById("wind");

    //Append values from json data to html elements
    location.innerHTML = data.name + ", " + data.sys.country;
    time.innerHTML = getTime(data.sys.country, data.dt);
    weatherMain.innerHTML = (data.weather[0].main);
    weatherImg.src = getWeatherImg(weatherMain.innerHTML);
    temp.innerHTML = convertKelvin(data.main.temp);
    humidity.innerHTML = "Humidity: " + data.main.humidity + "%";
    wind.innerHTML = "Wind: " + data.wind.speed + " mph";
}

function getTime(country, time) {
    let date = new Date(time * 1000);
    let min = "0" + date.getMinutes();
    let ampm = date.getHours() < 12 ? "AM" : "PM";
    let hr;

    //Switch between 12/24 hour clock depending on country
    switch (country) {
        case "US":
        case "UK":
        case "CA":
        case "AU":
            hr = date.getHours() % 12 || 12;
            break;
        default:
            hr = date.getHours();
            break;
    }

    let formattedTime = hr + ": " + min.substr(-2) + " " + ampm;
    return formattedTime;
}

function getWeatherImg(description) {
    switch (description) {
        case "Clear":
            return "images/sun.png";
        case "Clouds":
            return "images/Clouds.png";
        case "Rain":
            return "images/rain.png";
        case "Thunderstorm":
            return "images/thunderstorm.png";
        case "Snow":
            return "images/snow.png";
        case "Mist":
            return "http://openweathermap.org/img/w/50d.png";
    }
}

function convertKelvin(tempK) {
    const tempF = Math.round(((parseFloat(tempK) - 273.15) * (9 / 5)) + 32);
    const tempC = Math.round(parseFloat(tempK) - 273.15);
    const formattedTemp = tempF + "&deg;F" + "/" + tempC + "&degC";

    return formattedTemp;
}