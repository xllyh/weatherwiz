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
  )}°c`;

  let currentHumidityElement = document.querySelector(".currentHumidity");
  currentHumidityElement.innerHTML = `${Math.round(
    response.data.main.humidity
  )}`;

  let currentWindElement = document.querySelector(".currentWind");
  currentWindElement.innerHTML = `${Math.round(response.data.wind.speed)}`;

  getForecast(response.data.coord);
}

let currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Hong Kong&units=metric&appid=d3cc01913a58e21e1660291b8458a847`;
axios.get(currentWeatherUrl).then(getDefaultWeather);

//Forecast Weather Loop

function formatDay(timestamp) {
  let forecastDate = new Date(timestamp * 1000);
  let forecastDay = forecastDate.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

  return days[forecastDay];
}

function displayForecast(response) {
  let forecastElement = document.querySelector(".forecast");

  let forecastDaily = response.data.daily;
  let forecastHTML = `<div class="row">`;

  forecastDaily.forEach(function (day, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col-2">
                <span class="forecastDay">${formatDay(day.dt)}</span>
          <img class="forecastImage" src= "http://openweathermap.org/img/wn/${
            day.weather[0].icon
          }@2x.png">
        <span class="forecastTemp"> <span id="forecast-min">${Math.round(
          day.temp.min
        )}°</span>  |  <span id="forecast-max">${Math.round(
          day.temp.max
        )}°</span></span>
        </div>
`;
    }
  });

  forecast = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "d3cc01913a58e21e1660291b8458a847";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

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
    )}°c`;

    currentHumidityElement.innerHTML = `${Math.round(
      response.data.main.humidity
    )}`;

    currentWindElement.innerHTML = `${Math.round(response.data.wind.speed)}`;

    getForecast(response.data.coord);
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
  )}°c`;

  currentHumidityElement.innerHTML = `${Math.round(
    response.data.main.humidity
  )}`;

  currentWindElement.innerHTML = `${Math.round(response.data.wind.speed)}`;

  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
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
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = Math.round(celsiusTemperature * (9 / 5) + 32);
  let fahrenheitFeelsTemp = Math.round(celsiusFeelsTemp * (9 / 5) + 32);
  temperatureElement.innerHTML = fahrenheitTemp;
  currentFeelsElement.innerHTML = `${fahrenheitFeelsTemp}°f`;
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".currentTemp");
  let currentFeelsElement = document.querySelector(".currentFeels");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let celsiusFeelsTempElement = Math.round(celsiusFeelsTemp);

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  currentFeelsElement.innerHTML = `${celsiusFeelsTempElement}°c`;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);
