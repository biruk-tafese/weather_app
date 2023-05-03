const apiKey = "ce492aa9e46415f0cc5abd3f41680813";

const weatherDataEle = document.getElementById("weather-data");

const cityInputEle   = document.getElementById("city-input");

const formEle = document.querySelector("form");

formEle.addEventListener("submit", (event)=> {
        event.preventDefault();
        const cityValue = cityInputEle.value;
        getWeatherData(cityValue);

});

async function getWeatherData(cityValue) {
    try {
       const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`);
         if (!response.ok) {
            throw new Error("network response was not okey!");
         }

      const data = await response.json();

       const temperature = Math.round(data.main.temp);
       
       const description = data.weather[0].description;
       
       const icon = data.weather[0].icon;
       
       const details = [
            `Feels like: ${Math.round(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}`,
            `Wind speed: ${data.wind.speed} m/s`
       ];

       weatherDataEle.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
       weatherDataEle.querySelector(".temperature").textContent =`${temperature}°C`;
       weatherDataEle.querySelector(".description").textContent = description;
       weatherDataEle.querySelector(".details").innerHTML = details.map((detail) => `<div>${detail}</div> `).join("");
      
       console.log(data);
    } catch(error) {
        weatherDataEle.querySelector(".icon").innerHTML = "";
        weatherDataEle.querySelector(".temperature").textContent ="";
        weatherDataEle.querySelector(".description").textContent = "An Error Happend, Please try again later!";
        weatherDataEle.querySelector(".details").innerHTML = "";
    }
}