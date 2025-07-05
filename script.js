const apiKey = "11160a8e2e3a470fe022084f2bfa1fee";

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const weatherDiv = document.getElementById("weatherInfo");

  if (!city) {
    weatherDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  // Use CORS proxy to avoid GitHub Pages restrictions
  const url = `https://api.allorigins.win/raw?url=${encodeURIComponent(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  )}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      weatherDiv.innerHTML = `<p>City not found.</p>`;
    } else if (data.cod && data.cod !== 200) {
      weatherDiv.innerHTML = `<p>Error: ${data.message}</p>`;
    } else {
      const temp = data.main.temp;
      const desc = data.weather[0].description;
      const humidity = data.main.humidity;

      weatherDiv.innerHTML = `
        <h3>${data.name}</h3>
        <p>Temperature: ${temp}°C</p>
        <p>Condition: ${desc}</p>
        <p>Humidity: ${humidity}%</p>
      `;
    }
  } catch (error) {
    weatherDiv.innerHTML = `<p>Error fetching weather data.</p>`;
    console.error("Fetch error:", error);
  }
}
