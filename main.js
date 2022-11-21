const WEATHER_API_KEY = "38a6285835f70040b63d91a7cea40a1d";
const GIF_API_KEY = "qCKx9YlFhV69ob7gIspPEJVbaBCZgziv";

async function reqWeatherData (location) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${WEATHER_API_KEY}`);
  return await response.json();
}

async function getWeatherData (location,celscius=true) {
  const json = await reqWeatherData(location);
  const weatherType = json.weather[0].main;
  let temp = null;
  if (celscius) {
    temp = `${Math.round(json.main.temp - 273.15)} °C`
  } else {
    temp = `${Math.round((json.main.temp - 273.15)*(9/5)+32)} °F`
  }
  return {weatherType,temp}
}

async function reqGiphy (weather) {
  const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${GIF_API_KEY}&s=${weather}`);
  console.log(`https://api.giphy.com/v1/gifs/translate?api_key=${GIF_API_KEY}&s=${weather}`);
  return await response.json();
}

async function showWeatherGif (weather) {
  const json = await reqGiphy(weather);
  const url = json.data.images.original.url;
  const img = document.querySelector("img");
  img.src = url;
}

const form = document.querySelector("form");
const loc = document.querySelector("#loc");

form.addEventListener("submit", e => {
  const location = loc.value;

  getWeatherData(location)
    .then( 
      function fulfilled ( {weatherType, temp} ) {
        const tempDOM = document.querySelector(".temp");
        tempDOM.textContent = temp;
        showWeatherGif(weatherType);
        console.log(weatherType,temp);
      }
    ).catch( err => console.log("Quited with error:",err))
  e.preventDefault();
})
