document.addEventListener("DOMContentLoaded", function () {
  const API_ID = "8657cc336160eb11f6a16df356a8d3fb";

  const cityInput = document.getElementById("city-input");
  const searchButt = document.getElementById("search-butt");
  const cityName = document.getElementById("city-name");
  const Temperature = document.getElementById("temperature");
  const Weather = document.getElementById("weather");

  async function dataClimate(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_ID}`;

    cityData = await fetch(url);
    const data = await cityData.json();
    displayClimate(data);
  }
  function displayClimate(data) {
    const { name, main, weather } = data;
    cityName.textContent = name;
    Temperature.textContent = `Temperature : ${main.temp}`;
    Weather.textContent = `Weather : ${weather[0].main}`;
  }

  searchButt.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (city === "") return;

    try {
      const weatherData = await dataClimate(city);
      displayClimate(weatherData);
    } catch (error) {
      console.error(error);
    }
  });
});
