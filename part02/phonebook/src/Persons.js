const Persons = (props) => {
  return (
    <div>
      { props.persons
          .filter((person) => person.name.toLowerCase().includes(props.searchText.toLowerCase()))
          .map((person) => <div key={person.name}>{person.name} {person.phone}</div>) }
    </div>
  );
}

export default Persons;
