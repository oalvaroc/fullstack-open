import { useEffect, useState } from "react";
import axios from "axios";

import CountryInput from './CountryInput';
import CountryList from "./CountryList";

const COUNTRIES_URL = 'https://restcountries.com/v3/all?fields=name,capital,area,languages,flags,cca3';

const App = () => {
  const [countryInput, setCountryInput] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios.get(COUNTRIES_URL)
         .then((res) => setCountries(res.data))
         .catch((err) => setCountries([]));
  }, []);

  useEffect(() => {
    if (countryInput === '') {
      setFilteredCountries([]);
      return;
    }
    const filteredBySubstring = countries.filter((country) => {
      const name = country.name.common.toLowerCase();
      const input = countryInput.toLowerCase();
      return name.includes(input);
    });
    const filteredByEq = filteredBySubstring.filter((country) => {
      const name = country.name.common.toLowerCase();
      const input = countryInput.toLowerCase();
      return name === input;
    });

    setFilteredCountries(filteredByEq.length !== 0 ? filteredByEq : filteredBySubstring);
  }, [countryInput, countries]);

  return (
    <div>
      <h1>Countries</h1>

      <CountryInput
        value={countryInput}
        onChange={(e) => setCountryInput(e.target.value)} />

      { filteredCountries.length > 10 ?
          <div>Too many matches. Specify another filter!</div> :
          <CountryList countries={filteredCountries} /> }
    </div>
  );
}

export default App;
