// Window loading for previous searched cities
window.addEventListener("load", displayRecentCities);

// Universal variables
const APIKey = "2bc700e76041ffb081a76ec8221c81f0";
const button = document.getElementById("searchBtn");
const cityInput = document.querySelector('input');
const cityName = document.getElementById("cityName");
const today = dayjs();

// Current variables
const tempCurrent = document.getElementById("tempCurrent");
const windCurrent = document.getElementById("windCurrent");
const humidityCurrent = document.getElementById("humidityCurrent");
const dateCurrent = document.getElementById("currentDate");
dateCurrent.textContent = (today.format(' MM/DD/YYYY'));

// Day 1 variables
const day1 = today.add(1, 'day').format('MM/DD/YYYY');
document.getElementById("day1").innerHTML = day1;

// Day 2 variables
const day2 = today.add(2, 'day').format('MM/DD/YYYY');
document.getElementById("day2").innerHTML = day2;

// Day 3 variables
const day3 = today.add(3, 'day').format('MM/DD/YYYY');
document.getElementById("day3").innerHTML = day3;

// Day 4 variables
const day4 = today.add(4, 'day').format('MM/DD/YYYY');
document.getElementById("day4").innerHTML = day4;

// Day 5 variables
const day5 = today.add(5, 'day').format('MM/DD/YYYY');
document.getElementById("day5").innerHTML = day5;

// Button listeners
document.addEventListener("DOMContentLoaded", function() {
  button.addEventListener("click", getCurrentWeather);
  button.addEventListener("click", getForecast);
});


function getCurrentWeather(){
  // set variables and use them for the the current day data fetch
  const city= cityInput.value;
  const iconImg = document.getElementById("iconImg");

  console.log(city);

  let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";

  storeCity(city);
  displayRecentCities();

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
    const iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
    iconImg.setAttribute('src', iconUrl);
  })

  .catch(error => {
      console.log(error);
    alert('Unable to get Weather Data, please make sure the cities name is spelled correctly!');
  });
};

function getForecast(){
  const city= cityInput.value;

  console.log(city);

  let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";

  // fetch data from api to display forecast
  fetch(queryURL)
  .then(response => response.json())
  .then(data => {
    console.log(data);
  // update 5-day forecast cards with for loop
    for (let i = 0; i < 5; i++) {
      const card = document.getElementById(`card${i+1}`);
      const day = document.getElementById(`day${i+1}`);
      const temp = document.getElementById(`temp${i+1}`);
      const wind = document.getElementById(`wind${i+1}`);
      const humidity = document.getElementById(`humidity${i+1}`);
      const iconImg = card.querySelector("img");
      const iconCode = data.list[i*8].weather[0].icon;
      const iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";

      iconImg.setAttribute('src', iconUrl);
      temp.textContent = "Temp: " + data.list[i*8].main.temp + " F";
      wind.textContent = "Wind: " + data.list[i*8].wind.speed + " MPH";
      humidity.textContent = "Humidity: " + data.list[i*8].main.humidity + "%";
    }
  })
  .catch(error => {
      console.log(error);
      alert('Unable to get Weather Data, please make sure the city name is spelled correctly!');
  });
};

function storeCity(city) {
  const savedCities = JSON.parse(localStorage.getItem("cities")) || [];
  savedCities.push(city);
  localStorage.setItem("cities", JSON.stringify(savedCities));
};


function displayRecentCities() {
  const savedCities = JSON.parse(localStorage.getItem("cities")) || [];
  const reversedCities = savedCities.reverse();
  // only want to show ONLY 5 most recent searches as too many is overwhelming
  const recentCities = reversedCities.slice(0, 5);

  // clear previous cards
  const container = document.getElementById("recent-cities");
  container.innerHTML = "";

  // creates a card for each of the most recent searches
  recentCities.forEach(city => {
    const card = document.createElement("div");
    card.classList.add("align-items-center", "card", "card-body", "border-info", "text-info", "pt-3");
    card.innerHTML = `<h5>${city}</h5>`;

  // Added event listener to card elements created and run getCurrentWeather for city on click
    card.addEventListener("click", function() {
      cityInput.value = city; 
      getCurrentWeather();
      getForecast();
    });

    container.appendChild(card);
  });
}


displayRecentCities();
