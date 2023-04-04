// universal variables
const APIKey = "2bc700e76041ffb081a76ec8221c81f0";
const button = document.getElementById("searchBtn");
const cityInput = document.querySelector('input');
const cityName = document.getElementById("cityName");

// Current variables
const tempCurrent = document.getElementById("tempCurrent");
const windCurrent = document.getElementById("windCurrent");
const humidityCurrent = document.getElementById("humidityCurrent");


window.addEventListener("load", displayRecentCities);


document.addEventListener("DOMContentLoaded", function() {
  button.addEventListener("click", getCurrentWeather);
});

function getCurrentWeather(){
// set variables and use them for the the data fetch later
  const city= cityInput.value;
  const iconImg = document.getElementById("iconImg");

  console.log(city);

  let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";

  storeCity(city);

  // fetch data from api to display current weather
  fetch(queryURL)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // update current weather info card
    cityName.textContent = data.name;
    tempCurrent.textContent = "Temperature: " + data.main.temp + " F";
    windCurrent.textContent = "Wind: " + data.wind.speed + " MPH";
    humidityCurrent.textContent = "Humidity: " + data.main.humidity + "%";
    const iconCode = data.weather[0].icon;
    const iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
    iconImg.setAttribute('src', iconUrl);
  })

  .catch(error => {
      console.log(error);
    alert('Unable to get Weather Data, please make sure the cities name is spelled correctly!');
  });
};



function storeCity(city) {
  const savedCities = JSON.parse(localStorage.getItem("cities")) || [];

  if(!savedCities.includes(city)) {
    savedCities.push(city);
  }

  localStorage.setItem("cities", JSON.stringify(savedCities));
};

function displayRecentCities() {
  const savedCities = JSON.parse(localStorage.getItem("cities")) || [];
  const reversedCities = savedCities.reverse();
  const recentCities = reversedCities.slice(0, 5);

  const container = document.getElementById("recent-cities");
  container.innerHTML = ""; // clear previous cards

  recentCities.forEach(city => {
    const card = document.createElement("div");
    card.classList.add("align-items-center", "card", "card-body", "border-info", "text-info");
    card.innerHTML = `<h5>${city}</h5>`;
    container.appendChild(card);
  });
}

// call displayRecentCities to initially populate the list
displayRecentCities();
