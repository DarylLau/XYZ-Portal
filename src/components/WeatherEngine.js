import React, { useState, useEffect } from "react";
import WeatherCard from "./WeatherCard/component";

const WeatherEngine = ({ location }) => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState({
    temp: null,
    city: null,
    condition: null,
    country: null,
  });

  const getWeather = async (q) => {
    setQuery("");
    setLoading(true);
    try {
      const apiRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${q}&units=metric&appid=2aa9e83df9a8e4efb5c710b99c86a3ad`
      );

      const resJson = await apiRes.json();
      setWeather({
        temp: resJson.main.temp,
        city: resJson.name,
        condition: resJson.weather[0].main,
        country: resJson.sys.country,
      });
    } catch (error) {
      setError(true);
    }

    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    //this is the async method to fetch api
    getWeather(query);
  };

  //whatever in the [] changes, it will rerun the query
  //this hook will make the code run only once the component is mounted and never again
  useEffect(() => {
    getWeather(location);
  }, [location]);

  return (
    <div>
      {!loading && !error ? (
        <div>
          <WeatherCard
            temp={weather.temp}
            condition={weather.condition}
            city={weather.city}
            country={weather.country}
          />
          <form>
            <input value={query} onChange={(e) => setQuery(e.target.value)} />
            <button onClick={(e) => handleSearch(e)}>Search</button>
          </form>
        </div>
      ) : loading ? (
        <div style={{ color: "black" }}>Loading</div>
      ) : !loading && error ? (
        <div style={{ color: "black" }}>
          There has been an error!
          <br />
          <button onClick={() => setError(false)}>Reset!</button>
        </div>
      ) : null}
    </div>
  );
};

export default WeatherEngine;
