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
}

let city = "Lisbon";
let apiKey = `6113e3b3510550cbd3323000a23aede8`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
