import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]);
  const [newName, setNewName] = useState('');

  const addPerson = (event) => {
    event.preventDefault();

    if (newName === '') {
      alert('Person name cannot be empty!');
    }
    else if (!persons.some((person) => person.name === newName)) {
      setPersons(persons.concat({ name: newName }));
      setNewName('');
    }
    else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type='submit'>Add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <div>
        { persons.map((person) => <div key={person.name}>{person.name}</div>) }
      </div>
    </div>
  );
}

export default App;
