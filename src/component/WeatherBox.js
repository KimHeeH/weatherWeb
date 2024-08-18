import React from "react";

const WeatherBox = ({ weather }) => {
  return (
    <div>
      <div className="place">지역 {weather?.name}</div>
      <h2>
        온도 {weather?.main.temp}C /{parseInt(weather?.main.temp * 1.8 + 32)}F
      </h2>
      <h3>기상 상황{weather?.weather[0].description}</h3>
    </div>
  );
};

export default WeatherBox;
