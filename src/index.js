let apikey = "33f2tedfbf4o930695dbbb808ab0c1ae";
let city = "Nairobi";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=33f2tedfbf4o930695dbbb808ab0c1ae&units=metric`;

// https://api.shecodes.io/weather/v1/current?query=Nairobi&key=33f2tedfbf4o930695dbbb808ab0c1ae&units=metric

function formatDate(timestamp) {
  let date = new Date(timestamp);

  let day = date.toLocaleString("default", {
    weekday: "long",
  });

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

let celciusTemperature = null;
function displayTemperature(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = `${temperature}`;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  let wind = Math.round(response.data.wind.speed);
  windElement.innerHTML = `${wind}Km/h`;
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute("src", response.data.condition.icon_url);
  iconElement.setAttribute("alt", response.data.condition.description);
  celciusTemperature = response.data.temperature.current;
  getForecast(response.data.coordinates);
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "33f2tedfbf4o930695dbbb808ab0c1ae";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function search(city) {
  let apikey = "33f2tedfbf4o930695dbbb808ab0c1ae";

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=33f2tedfbf4o930695dbbb808ab0c1ae&units=metric`;

  let forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=33f2tedfbf4o930695dbbb808ab0c1ae&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
  axios.get(forecastUrl).then(displayForecast);
}
search("Nairobi");

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  let fahrenheitTemperatureElement = document.querySelector("#temperature");
  fahrenheitTemperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

function displayCelciusTemperature(event) {
  event.preventDefault();
  let celciusTemperatureElement = document.querySelector("#temperature");
  celciusTemperatureElement.innerHTML = Math.round(celciusTemperature);
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}
let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemperature);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
        <img
          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
            forecastDay.condition.icon
          }.png" alt="forecastDay.condition.description" width="54"/>
        
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temperature.maximum
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temperature.minimum
          )}° </span>
        </div>
      </div>
     
      `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
