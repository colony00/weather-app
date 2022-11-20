const WEATHER_API_KEY = "38a6285835f70040b63d91a7cea40a1d";

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

const form = document.querySelector("form");
const loc = document.querySelector("#loc");

form.addEventListener("submit", e => {
  const location = loc.value;

  getWeatherData(location)
    .then( 
      function fulfilled ( {weatherType, temp} ) {
        console.log(weatherType,temp)
      },
  
      function rejected(err) {
        console.log("Failed with error:",err)
      }
    );
  e.preventDefault();
})
