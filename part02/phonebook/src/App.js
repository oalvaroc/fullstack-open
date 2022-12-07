import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '(19) 99999-0000' }
  ]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [searchText, setSearchText] = useState('');

  const addPerson = (event) => {
    event.preventDefault();

    if (newName === '') {
      alert('Person name cannot be empty!');
    }
    else if (newPhone === '') {
      alert('Person phone cannot be empty!');
    }
    else if (!persons.some((person) => person.name === newName)) {
      setPersons(persons.concat({ name: newName, phone: newPhone }));
      setNewName('');
      setNewPhone('');
    }
    else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Search</h2>
      <div>
        Search for name containing: <input value={searchText} onChange={(e) => setSearchText(e.target.value)} />
      </div>
      <h2>Create</h2>
      <form onSubmit={addPerson}>
        <div>
          Name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          Phone: <input value={newPhone} onChange={(e) => setNewPhone(e.target.value)} />
        </div>
        <div>
          <button type='submit'>Add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <div>
        { persons
            .filter((person) => person.name.toLowerCase().includes(searchText.toLowerCase()))
            .map((person) => <div key={person.name}>{person.name} {person.phone}</div>) }
      </div>
    </div>
  );
}

export default App;
