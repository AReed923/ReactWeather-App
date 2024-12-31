import React, { useState } from "react";
import './App.css';

function WeatherApp() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");
    const [unit, setUnit] = useState("metric");

    const apiKey = "3ae13a58e3715089880a099af9537ea2";

    const fetchWeather = async () => {
        if (!city) return;

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`
            );

            if (!response.ok) throw new Error("City not found");

            const data = await response.json();
            setWeather(data);
            setError("");
        } catch (err) {
            setWeather(null);
            setError(err.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeather();
    };

    const toggleUnit = () => {
        const newUnit = unit === "metric" ? "imperial" : "metric";
        setUnit(newUnit);
        setWeather(null);
    };

    return (
        <div>
            <h1>Weather App</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button type="submit">Get Weather</button>
            </form>

            {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

            {weather && (
                <div className="weather-info">
                    <h2>{weather.name}</h2>
                    { }
                    <p>{weather.sys.country}</p>

                    { }
                    <p>
                        Temperature: {weather.main.temp}
                        {unit === "metric" ? "°C" : "°F"}
                    </p>
                    <p>Condition: {weather.weather[0].description}</p>
                    <img
                        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt="Weather icon"
                    />
                </div>
            )}

            <button onClick={toggleUnit} style={{ marginTop: "20px" }}>
                Switch to {unit === "metric" ? "Fahrenheit" : "Celsius"}
            </button>
        </div>
    );
}

export default WeatherApp;