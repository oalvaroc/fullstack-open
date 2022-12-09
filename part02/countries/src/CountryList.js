import Country from "./Country";

const CountryList = (props) => {
  const { countries } = props;

  if (countries.length === 1) {
    return <Country country={countries[0]} />;
  }
  else {
    return (
      <div>
        { countries.map((country) => <div key={country.cca3}>{country.name.common}</div>) }
      </div>
    );
  }
}

export default CountryList;
