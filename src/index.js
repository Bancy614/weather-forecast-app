let apikey = "33f2tedfbf4o930695dbbb808ab0c1ae";
let city = "Nairobi";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
console.log(apiUrl);

// https://api.shecodes.io/weather/v1/current?query=Nairobi&key=33f2tedfbf4o930695dbbb808ab0c1ae&units=metric

function displayTemperature(response) {
  console.log(response.data);
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let temperatureElement = document.querySelector("#temperature");
  let humidityElement = document.querySelector("#humidity");
  lewindElement = document.querySelector("#wind");

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = response.data.main.temp;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
}
axios.get(apiUrl).then(displayTemperature);
