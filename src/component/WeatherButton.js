import React from "react";
import { Button } from "react-bootstrap";

const WeatherButton = ({
  cities,
  setCity,
  color,
  selectedCity,
  getCurrentLocation,
}) => {
  console.log(cities);

  return (
    <div>
      <Button
        style={{
          border: "1px solid rgb(158, 158, 158)",
          color: "black",
          margin: 10,
          backgroundColor: selectedCity === "" ? "white" : "transparent",
        }}
        variant="outline-light"
        onClick={getCurrentLocation}
      >
        Current Location
      </Button>
      {cities.map((item, index) => (
        <Button
          style={{
            border: "1px solid rgb(158, 158, 158)",
            color: "black",
            margin: 10,
            backgroundColor: selectedCity === item ? "white" : "transparent",
          }}
          variant="outline-light"
          key={index}
          onClick={() => setCity(item)}
        >
          {item}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton;
