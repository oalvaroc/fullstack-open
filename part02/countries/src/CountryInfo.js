const CountryInfo = (props) => {
  const { country } = props;

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

    </div>
  );
}

export default CountryInfo;
