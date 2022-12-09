import { useState } from "react";
import CountryInfo from "./CountryInfo";

const CountryListItem = (props) => {
  const { country } = props;

  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  return (
    <div>
      { show ? <CountryInfo country={country} /> : country.name.common }
      <button onClick={handleClick}>{ show ? 'hide' : 'show' }</button>
    </div>
  );

}

const CountryList = (props) => {
  const { countries } = props;

  if (countries.length === 1) {
    return <CountryInfo country={countries[0]} />;
  }
  else {
    return (
      <div>
        { countries.map((country) => <CountryListItem key={country.cca3} country={country} />) }
      </div>
    );
  }
}

export default CountryList;
