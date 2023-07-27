let apikey = "33f2tedfbf4o930695dbbb808ab0c1ae";
let city = "Nairobi";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=33f2tedfbf4o930695dbbb808ab0c1ae&units=metric`;

// https://api.shecodes.io/weather/v1/current?query=Nairobi&key=33f2tedfbf4o930695dbbb808ab0c1ae&units=metric

function displayTemperature(response) {
  console.log(response.data);
  console.log(response.data.temperature.current);
  console.log(response.data.condition.description);
  console.log(response.data.temperature.humidity);
  console.log(response.data.wind.speed);
  console.log(response.data.time);

  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");

  cityElement.innerHTML = response.data.city;
  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = `${temperature}`;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  let wind = Math.round(response.data.wind.speed);
  windElement.innerHTML = `${wind}Km/h`;
  dateElement.innerHTML = formatDate(response.data.time * 1000);
}
axios.get(apiUrl).then(displayTemperature);

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
