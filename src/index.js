//Reflect Current Time & Date
let now = new Date();

let weekDay = now.getDay();
let hour = String(now.getHours()).padStart(2, "0");
let minute = String(now.getMinutes()).padStart(2, "0");

let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let dayOfWeek = weekDays[weekDay];

let currentTime = document.querySelector("h5");
currentTime.innerHTML = `${dayOfWeek} - ${hour}:${minute}`;

//Get Default Weather Data

function getDefaultWeather(response) {
  celsiusTemperature = response.data.main.temp;
  celsiusFeelsTemp = response.data.main.feels_like;

  let currentWeather = document.querySelector(".currentTemp");
  currentWeather.innerHTML = `${Math.round(celsiusTemperature)}`;

  let currentWeatherImageElement = document.querySelector(
    ".currentWeatherImage"
  );
  currentWeatherImageElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  let currentDescElement = document.querySelector(".currentDesc");
  currentDescElement.innerHTML = response.data.weather[0].description;

  let currentFeelsElement = document.querySelector(".currentFeels");
  currentFeelsElement.innerHTML = `${Math.round(
    response.data.main.feels_like
  )}`;

  let currentHumidityElement = document.querySelector(".currentHumidity");
  currentHumidityElement.innerHTML = `${Math.round(
    response.data.main.humidity
  )}`;

  let currentWindElement = document.querySelector(".currentWind");
  currentWindElement.innerHTML = `${Math.round(response.data.wind.speed)}`;
}

let currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Hong Kong&units=metric&appid=d3cc01913a58e21e1660291b8458a847`;
axios.get(currentWeatherUrl).then(getDefaultWeather);

//Display searched city name

function reflectName(event) {
  event.preventDefault();
  let chosenCity = document.querySelector("#city");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${chosenCity.value.toUpperCase()}`;
}

function reflectTemp(event) {
  let chosenCity = document.querySelector("#city");
  let apiKey = "d3cc01913a58e21e1660291b8458a847";

  function getTemp(response) {
    let currentTemp = document.querySelector(".currentTemp");
    let currentDescElement = document.querySelector(".currentDesc");
    let currentFeelsElement = document.querySelector(".currentFeels");
    let currentHumidityElement = document.querySelector(".currentHumidity");
    let currentWindElement = document.querySelector(".currentWind");

    celsiusTemperature = response.data.main.temp;
    celsiusFeelsTemp = response.data.main.feels_like;

    currentTemp.innerHTML = `${Math.round(celsiusTemperature)}`;
    currentDescElement.innerHTML = response.data.weather[0].description;

    currentFeelsElement.innerHTML = `${Math.round(
      response.data.main.feels_like
    )}`;

    currentHumidityElement.innerHTML = `${Math.round(
      response.data.main.humidity
    )}`;

    currentWindElement.innerHTML = `${Math.round(response.data.wind.speed)}`;
  }

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${chosenCity.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(getTemp);
}

function reflectWeatherDesciption(event) {
  let chosenCity = document.querySelector("#city");
  let apiKey = "d3cc01913a58e21e1660291b8458a847";

  function getWeatherDesc(response) {
    let currentWeatherDescription = document.querySelector(".currentDesc");
    currentWeatherDescription.innerHTML = response.data.weather[0].description;
  }

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${chosenCity.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(getWeatherDesc);
}

function reflectIcon(event) {
  let chosenCity = document.querySelector("#city");
  let apiKey = "d3cc01913a58e21e1660291b8458a847";

  function getIcon(response) {
    let currentIcon = document.querySelector(".currentWeatherImage");
    currentIcon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  }

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${chosenCity.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(getIcon);
}

let cityInput = document.querySelector("#city-form");
cityInput.addEventListener("submit", reflectName);
cityInput.addEventListener("submit", reflectTemp);
cityInput.addEventListener("submit", reflectWeatherDesciption);
cityInput.addEventListener("submit", reflectIcon);

//Display Current Location City name and Temp

let apiKey = "d3cc01913a58e21e1660291b8458a847";

function getTemp(response) {
  let temp = Math.round(celsiusTemperature);
  let currentTemp = document.querySelector(".currentTemp");
  let currentDescElement = document.querySelector(".currentDesc");
  let currentFeelsElement = document.querySelector(".currentFeels");
  let currentHumidityElement = document.querySelector(".currentHumidity");
  let currentWindElement = document.querySelector(".currentWind");
  let currentIcon = document.querySelector(".currentWeatherImage");

  celsiusTemperature = response.data.main.temp;
  celsiusFeelsTemp = response.data.main.feels_like;

  currentTemp.innerHTML = `${temp}`;
  currentDescElement.innerHTML = response.data.weather[0].description;

  currentFeelsElement.innerHTML = `${Math.round(
    response.data.main.feels_like
  )}`;

  currentHumidityElement.innerHTML = `${Math.round(
    response.data.main.humidity
  )}`;

  currentWindElement.innerHTML = `${Math.round(response.data.wind.speed)}`;

  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function getCity(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data[0].name.toUpperCase()}`;
}

function myLatLon(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(getTemp);

  let apiUrlLocation = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;
  axios.get(apiUrlLocation).then(getCity);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(myLatLon);
}

let currentLocation = document.querySelector("#my-location");
currentLocation.addEventListener("click", getPosition);

let celsiusTemperature = null;
let celsiusFeelsTemp = null;

function showFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".currentTemp");
  let currentFeelsElement = document.querySelector(".currentFeels");
  let fahrenheitTemp = Math.round(celsiusTemperature * (9 / 5) + 32);
  let fahrenheitFeelsTemp = Math.round(celsiusFeelsTemp * (9 / 5) + 32);
  temperatureElement.innerHTML = fahrenheitTemp;
  currentFeelsElement.innerHTML = fahrenheitFeelsTemp;
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".currentTemp");
  let currentFeelsElement = document.querySelector(".currentFeels");

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  currentFeelsElement.innerHTML = Math.round(celsiusFeelsTemp);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);
