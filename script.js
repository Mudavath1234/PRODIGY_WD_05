document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your OpenWeatherMap API key
    const getWeatherBtn = document.getElementById('getWeatherBtn');
    const locationInput = document.getElementById('locationInput');
    const weatherResult = document.getElementById('weatherResult');

    getWeatherBtn.addEventListener('click', function() {
        const location = locationInput.value;
        if (location) {
            fetchWeather(location);
        }
    });

    function fetchWeather(location) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    displayWeather(data);
                } else {
                    weatherResult.innerHTML = `<p>${data.message}</p>`;
                }
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                weatherResult.innerHTML = `<p>Error fetching weather data. Please try again later.</p>`;
            });
    }

    function displayWeather(data) {
        const { name, main, weather } = data;
        const temperature = main.temp;
        const weatherDescription = weather[0].description;
        const weatherIcon = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;

        weatherResult.innerHTML = `
            <h3>Weather in ${name}</h3>
            <p><img src="${weatherIcon}" alt="${weatherDescription}"> ${weatherDescription}</p>
            <p>Temperature: ${temperature}°C</p>
        `;
    }
});
