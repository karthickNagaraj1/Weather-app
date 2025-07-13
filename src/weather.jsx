import { useState } from "react";
import axios from "axios";

function Weather() {
    const [city, setcity] = useState("")
    
    const [weather, setweather] = useState("")

    const [temp, settemp] = useState("")

    const [desc, setdesc] = useState("")

    function handelCity(evt)
    {
        setcity(evt.target.value)

    }

    function getWeather(){
        var weatherData = axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8579e357ac19e144fae533da321d539e`)
        weatherData.then(function(success){
            console.log(success.data)
            setweather(success.data.weather[0].main)
            setdesc(success.data.weather[0].description)
            settemp((success.data.main.temp - 273.15).toFixed(2));
        })
         .catch(() => {alert("City not found.")});
    }
   return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-300 via-blue-400 to-blue-600 px-4 transition-all duration-500">
      <div className="bg-white shadow-xl rounded-xl p-10 max-w-md w-full animate-fade-in">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-2">⛅ Weather Report</h1>
        <p className="text-center text-gray-700 mb-6">Enter your city to get the current weather</p>
        
        {/* Input + Button */}
        <div className="flex flex-col gap-4">
          <input onChange={handelCity} type="text" placeholder="Type your city..." className="p-3 rounded-md border border-gray-300 
          focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
           <button onClick={getWeather} className="bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-md 
           transition duration-300"> Get Report</button>
        </div>

        {/* Weather Display */}
        {weather && (
          <div className="mt-6 text-gray-700 text-center animate-fade-in">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">
              📍 {city}
            </h2>
            <div className="space-y-2">
              <p><strong>🌦️ Weather:</strong> {weather}</p>
              <p><strong>🌡️ Temperature:</strong> {temp} °C</p>
              <p><strong>📝 Description:</strong> {desc}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather