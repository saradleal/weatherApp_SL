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

function displayTemperature(response) {
  let tempElement = document.querySelector("#temp");
  let temperature = Math.round(response.data.main.temp);
  tempElement.innerHTML = `${temperature} ºC`;
  let humElement = document.querySelector("#hum");
  humElement.innerHTML = `${response.data.main.humidity}%`;
  let windElement = document.querySelector("#wind");
  let windInfo = Math.round(response.data.wind.speed);
  windElement.innerHTML = `${windInfo} km/h`;
  let descriptElement = document.querySelector("#description");
  descriptElement.innerHTML = `${response.data.weather[0].description}`;
  let currentDate = document.querySelector("#date");
  currentDate.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

let city = "Lisbon";
let apiKey = `6113e3b3510550cbd3323000a23aede8`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
