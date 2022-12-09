import axios from "axios";
import { useEffect, useState } from "react";

const WEATHER_URL_BASE = 'https://api.openweathermap.org/data/2.5';
const ICON_URL_BASE = 'http://openweathermap.org/img/wn';

const CountryInfo = (props) => {
  const { country } = props;

  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios.get(`${WEATHER_URL_BASE}/weather`, {
      params: {
        appid: process.env.REACT_APP_OPENWEATHER_API_KEY,
        lat: country.latlng[0],
        lon: country.latlng[1],
        units: 'metric'
      }
    }).then((res) => {
      const data = res.data;
      setWeather({
        temp: data.main.temp,
        wind: data.wind.speed,
        icon: `${data.weather[0].icon}@2x.png`
      });
    });
  }, []);

  return (
    <div>
      <h2>{country.name.common}</h2>

      <div>capital: {country.capital}</div>
      <div>area: {country.area} km²</div>

      <div>
        <h3>Languages:</h3>
        <ul>
          { Object.entries(country.languages).map((lang) => <li key={lang[0]}>{lang[1]}</li>) }
        </ul>
        <img alt={`${country.name.common} flag's`} src={country.flags[0]} width='200px'/>
      </div>

      <div>
        <h3>Weather in {country.name.common}</h3>
        <div>temperature: {weather.temp} ºC</div>
        <img alt="Weather" src={`${ICON_URL_BASE}/${weather.icon}`}/>
        <div>wind: {weather.wind} m/s</div>
      </div>

    </div>
  );
}

export default CountryInfo;
