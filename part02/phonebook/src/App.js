import { useState } from "react";
import Form from "./Form";
import Persons from "./Persons";
import Search from "./Search";

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
      <Search searchText={searchText} setSearchText={setSearchText} />

      <h2>Create</h2>
      <Form onSubmit={addPerson} name={newName} setName={setNewName} phone={newPhone} setPhone={setNewPhone} />

      <h2>Numbers</h2>
      <Persons persons={persons} searchText={searchText} />
    </div>
  );
}

export default App;
