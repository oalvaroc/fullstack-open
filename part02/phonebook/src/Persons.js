const Persons = (props) => {
  return (
    <div>
      { props.persons
          .filter((person) => {
            const name = person.name.toLowerCase();
            const search = props.searchText.toLowerCase();
            return name.includes(search);
          })
          .map((person) => {
            return (
              <div key={person.id}>
                {person.name} {person.number}
                <button onClick={() => props.handleDelete(person)}>delete</button>
              </div>
            );
          })
      }
    </div>
  );
}

export default Persons;
