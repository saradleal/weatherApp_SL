function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function displayTemperature(response) {
  let tempElement = document.querySelector("#temp");
  let temperature = Math.round(response.data.main.temp);
  let humElement = document.querySelector("#hum");
  let windElement = document.querySelector("#wind");
  let windInfo = Math.round(response.data.wind.speed);
  let descriptElement = document.querySelector("#description");
  let currentDate = document.querySelector("#date");

  celsiusTemperature = response.data.main.temp;

  tempElement.innerHTML = `${temperature} ºC`;
  humElement.innerHTML = `${response.data.main.humidity}%`;
  windElement.innerHTML = `${windInfo} km/h`;
  descriptElement.innerHTML = `${response.data.weather[0].description}`;
  currentDate.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
  <div class="row row-cols-3">
    <div class="col">${formatHours(forecast.dt * 1000)}</div>
      <div class="col">
        <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
        alt="forecast"
        class="forecast"
        />
        </div>
      <div class="col"><strong>${Math.round(
        forecast.main.temp_max
      )}ºC</strong> / ${Math.round(forecast.main.temp_min)}ºC</div>
    </div>
    `;
  }
}

function search(city) {
  let apiKey = `6113e3b3510550cbd3323000a23aede8`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
  let cityName = document.querySelector("#city");
  cityName.innerHTML = `${city}`;

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#cityInput");
  search(cityInputElement.value);
}

function showFahrenheit(event) {
  event.preventDefault();
  let farhTemp = (celsiusTemperature * 9) / 5 + 32;
  let farhFinal = Math.round(farhTemp);
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = `${farhFinal} ºF`;
}

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  let celsFinal = Math.round(celsiusTemperature);
  temperatureElement.innerHTML = `${celsFinal} ºC`;
}

let celsiusTemperature = null;

let form = document.querySelector("#searchForm");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#tempF");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#tempC");
celsiusLink.addEventListener("click", showCelsius);
