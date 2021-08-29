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
    currentTemp.innerHTML = `${Math.round(response.data.main.temp)}°c`;
  }

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${chosenCity.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(getTemp);
}

let cityInput = document.querySelector("#city-form");
cityInput.addEventListener("submit", reflectName);
cityInput.addEventListener("submit", reflectTemp);

//Display Current Location City name and Temp

let apiKey = "d3cc01913a58e21e1660291b8458a847";

function getTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector(".currentTemp");
  currentTemp.innerHTML = `${temp}°c`;
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
