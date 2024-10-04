// main.js

const BEACH_LOCATION_MAP = {
    "Juhu Beach": "Mumbai",
    "Marine Drive": "Mumbai",
    "Kovalam Beach": "Thiruvananthapuram",
    "Goa": "Goa",
    "Puri Beach": "Puri",
    // Add more beach mappings as needed
};

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const API_KEY = '3580bc6786f6a1f4667723d6947808e9'; // Replace with your actual API key

async function fetchWeather(beachName) {
    const city = BEACH_LOCATION_MAP[beachName] || beachName; // Use mapped city or the name itself

    try {
        const response = await fetch(`${WEATHER_API_URL}${city}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw new Error('Unable to fetch weather data: ' + error.message);
    }
}

document.getElementById('beachForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const beachName = document.getElementById('beachInput').value;

    try {
        const weatherData = await fetchWeather(beachName);
        const suitabilityMessage = evaluateSuitability(weatherData);
        document.getElementById('result').textContent = suitabilityMessage;

        // Display additional weather details
        displayWeatherDetails(weatherData);
    } catch (error) {
        document.getElementById('result').textContent = error.message;
        document.getElementById('weatherDetails').textContent = ''; // Clear previous weather details
    }
});

// Function to display weather details
function displayWeatherDetails(weatherData) {
    const temperature = weatherData.main.temp;
    const windSpeed = weatherData.wind.speed;
    const humidity = weatherData.main.humidity;
    const weatherCondition = weatherData.weather[0].description;

    const details = `
        <h3>Weather Details:</h3>
        <p>Temperature: ${temperature} °C</p>
        <p>Wind Speed: ${windSpeed} km/h</p>
        <p>Humidity: ${humidity}%</p>
        <p>Condition: ${weatherCondition.charAt(0).toUpperCase() + weatherCondition.slice(1)}</p>
    `;
    document.getElementById('weatherDetails').innerHTML = details;
}
