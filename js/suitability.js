// suitability.js

// Example thresholds for safety assessment (you can adjust these as needed)
const WIND_SPEED_THRESHOLD = 20; // km/h
const TEMPERATURE_THRESHOLD = 35; // °C
const HUMIDITY_THRESHOLD = 70; // %

function evaluateSuitability(weatherData) {
    if (!weatherData || !weatherData.main || !weatherData.weather || !weatherData.wind) {
        return "Weather data is not available for the assessment.";
    }

    const temperature = weatherData.main.temp;
    const windSpeed = weatherData.wind.speed;
    const humidity = weatherData.main.humidity;
    const weatherCondition = weatherData.weather[0].description.toLowerCase();

    let safetyMessage = "It is currently safe to visit the beach.";

    // Evaluate based on temperature
    if (temperature > TEMPERATURE_THRESHOLD) {
        safetyMessage = "It is too hot to visit the beach right now.";
    }
    // Evaluate based on wind speed
    else if (windSpeed > WIND_SPEED_THRESHOLD) {
        safetyMessage = "It is not safe to visit the beach due to high wind speeds.";
    }
    // Evaluate based on humidity
    else if (humidity > HUMIDITY_THRESHOLD) {
        safetyMessage = "High humidity levels make it uncomfortable to visit the beach.";
    }

    // Additional checks can be added here (e.g., for specific weather conditions)

    return safetyMessage;
}
