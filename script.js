document.getElementById("searchBtn").addEventListener("click", getWeather);

async function getWeather() {
    const city = document.getElementById("city").value;
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    const apiKey = "2040a2a26f81f4a19c260dff840945e6"; // Your API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            document.getElementById("weather-info").innerHTML = "<p>City not found!</p>";
            return;
        }

        const description = data.weather[0].description.toLowerCase();
        let backgroundImage = "";

        if (description.includes("rain")) {
            backgroundImage = "url('rainy_weather.avif')";
        } else if (description.includes("clear") || description.includes("sun")) {
            backgroundImage = "url('sunny_image.jpg')";
        } else if (description.includes("cloud")) {
            backgroundImage = "url('cloudy_image.webp')";
        } else if (description.includes("haze") || description.include("mist")) {
            backgroundImage = "url('haze_image.webp')";
        } 
          else {
            backgroundImage = "url('default_image.jpg')"; 
        }

        document.body.style.backgroundImage = backgroundImage;

        document.getElementById("weather-info").innerHTML = `
            <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
            <p><strong>Description:</strong> ${data.weather[0].description}</p>
        `;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.getElementById("weather-info").innerHTML = "<p>Failed to fetch weather data.</p>";
    }
}
