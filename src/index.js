//Feature #1
//In your project, display the current date and time using JavaScript: Tuesday 16:00

let currentTime = new Date();

function datetime() {
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let weekday = days[currentTime.getDay()];
  let currentMonth = months[currentTime.getMonth()];
  let dayNumber = currentTime.getDate();
  let year = currentTime.getFullYear();
  let hour = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  let ampm = currentTime.getHours();

  if (hour > 12) {
    hour = hour - 12;
  } else {
    hour = hour;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  } else {
    minutes = minutes;
  }

  if (ampm > 12) {
    ampm = "pm";
  } else {
    ampm = "am";
  }

  let formattedDate = `${weekday}, ${currentMonth} ${dayNumber}, ${year} at ${hour}:${minutes} ${ampm}`;

  return formattedDate;
}

let currentDatetime = document.querySelector("#current-date");
currentDatetime.innerHTML = datetime();

//Feature 2
//Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "fc792abbce83245fb7f94d72bd9f905d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "fc792abbce83245fb7f94d72bd9f905d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);

  console.log(apiUrl);
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Toronto");

//Bonus Feature
//Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit.
//When clicking on it, it should convert the temperature to Fahrenheit.
//When clicking on Celsius, it should convert it back to Celsius.

/*

let temp = 5;

function celsiusTemp(event) {
  event.preventDefault();
  let currTemp = document.querySelector("#curr-temp");
  currTemp.innerHTML = temp;
}

function fahrenheitTemp(event) {
  event.preventDefault();
  let currTemp = document.querySelector("#curr-temp");
  currTemp.innerHTML = Math.round(temp * (9 / 5) + 32);
}

let selectCelsius = document.querySelector("#celsius");
selectCelsius.addEventListener("click", celsiusTemp);

let selectFahrenheit = document.querySelector("#fahrenheit");
selectFahrenheit.addEventListener("click", fahrenheitTemp);


*/
