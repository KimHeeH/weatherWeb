import "./App.css";
import { useEffect, useState, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("green");
  const cities = ["paris", "new york", "tokyo", "seoul"];

  // 현재 위치 기반 날씨 정보 가져오는 함수
  const getCurrentLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
      console.log("현재위치", lat, lon);
    });
  }, []);

  // 현재 위치를 기반으로 날씨 정보를 가져오는 비동기 함수
  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=43134dbd7d6b477b80e801bca836e039&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      console.log(data);
      setWeather(data);
      setCity("");
    } catch (err) {
      console.log(err);
      alert("Failed to fetch weather data for the current location.");
    } finally {
      setLoading(false);
    }
  };

  // 선택된 도시의 날씨 정보를 가져오는 비동기 함수
  const getWeatherByCity = useCallback(async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=43134dbd7d6b477b80e801bca836e039&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      console.log(data);
      setWeather(data);
      setColor("#ffffff");
    } catch (err) {
      console.log(err);
      alert(`Failed to fetch weather data for ${city}.`);
    } finally {
      setLoading(false);
    }
  }, [city]);

  useEffect(() => {
    if (city === "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city, getCurrentLocation, getWeatherByCity]);

  return (
    <div>
      {loading ? (
        <div className="container">
          <ClipLoader color="#f88c6b" loading={loading} size={150} />
        </div>
      ) : (
        <div className="container">
          <div className="SphereContainer">
            <WeatherBox weather={weather} />

            <WeatherButton
              cities={cities}
              setCity={setCity}
              color={color}
              selectedCity={city}
              getCurrentLocation={getCurrentLocation}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
