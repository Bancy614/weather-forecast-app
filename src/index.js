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

function displayTemperature(response) {
  console.log(response.data);
  console.log(response.data.temperature.current);
  console.log(response.data.condition.description);
  console.log(response.data.temperature.humidity);
  console.log(response.data.wind.speed);
  console.log(response.data.time);
  console.log(response.data.condition.icon_url);

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
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
  console.log(cityInputElement.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function search(city) {
  let apikey = "33f2tedfbf4o930695dbbb808ab0c1ae";

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=33f2tedfbf4o930695dbbb808ab0c1ae&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}
search("Nairobi");

let celciusTemperature = null;

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

let forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=33f2tedfbf4o930695dbbb808ab0c1ae&units=metric`;

function displayForecasttemperature(response) {
  console.log(response.data);
  let temperatureDay1Element = document.querySelector("#temp-day1");
  let temperatureDay2Element = document.querySelector("#temp-day2");
  let temperatureDay3Element = document.querySelector("#temp-day3");
  let temperatureDay4Element = document.querySelector("#temp-day4");
  let temperatureDay5Element = document.querySelector("#temp-day5");
  let temperatureDay6Element = document.querySelector("#temp-day6");

  let temperatureDay1Max = Math.round(
    response.data.daily[0].temperature.maximum
  );
  temperatureDay1Element.innerHTML = `${temperatureDay1Max}°C`;

  let temperatureDay2Max = Math.round(
    response.data.daily[1].temperature.maximum
  );
  temperatureDay2Element.innerHTML = `${temperatureDay2Max}°C`;

  let temperatureDay3Max = Math.round(
    response.data.daily[2].temperature.maximum
  );
  temperatureDay3Element.innerHTML = `${temperatureDay3Max}°C`;

  let temperatureDay4Max = Math.round(
    response.data.daily[3].temperature.maximum
  );
  temperatureDay4Element.innerHTML = `${temperatureDay4Max}°C`;

  let temperatureDay5Max = Math.round(
    response.data.daily[4].temperature.maximum
  );
  temperatureDay5Element.innerHTML = `${temperatureDay5Max}°C`;

  let temperatureDay6Max = Math.round(
    response.data.daily[5].temperature.maximum
  );
  temperatureDay6Element.innerHTML = `${temperatureDay6Max}°C`;

  // min temperature
  let minTemperatureDay1Element = document.querySelector("#min-temp-day1");
  let minTemperatureDay2Element = document.querySelector("#min-temp-day2");
  let minTemperatureDay3Element = document.querySelector("#min-temp-day3");
  let minTemperatureDay4Element = document.querySelector("#min-temp-day4");
  let minTemperatureDay5Element = document.querySelector("#min-temp-day5");
  let minTemperatureDay6Element = document.querySelector("#min-temp-day6");

  let minTemperatureDay1 = Math.round(
    response.data.daily[0].temperature.minimum
  );
  minTemperatureDay1Element.innerHTML = `${minTemperatureDay1}°C`;

  let minTemperatureDay2 = Math.round(
    response.data.daily[1].temperature.minimum
  );
  minTemperatureDay2Element.innerHTML = `${minTemperatureDay2}°C`;

  let minTemperatureDay3 = Math.round(
    response.data.daily[2].temperature.minimum
  );
  minTemperatureDay3Element.innerHTML = `${minTemperatureDay3}°C`;

  let minTemperatureDay4 = Math.round(
    response.data.daily[3].temperature.minimum
  );
  minTemperatureDay4Element.innerHTML = `${minTemperatureDay4}°C`;

  let minTemperatureDay5 = Math.round(
    response.data.daily[4].temperature.minimum
  );
  minTemperatureDay5Element.innerHTML = `${minTemperatureDay5}°C`;

  let minTemperatureDay6 = Math.round(
    response.data.daily[5].temperature.minimum
  );
  minTemperatureDay6Element.innerHTML = `${minTemperatureDay6}°C`;
}
axios.get(forecastUrl).then(displayForecasttemperature);
