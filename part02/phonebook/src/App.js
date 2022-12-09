import { useEffect, useState } from "react";
import Form from "./Form";
import Persons from "./Persons";
import Search from "./Search";

import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [searchText, setSearchText] = useState('');

  // fetch persons list
  useEffect(() => {
    personsService
      .getAll()
      .then((res) => setPersons(res));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    if (newName === '') {
      alert('Person name cannot be empty!');
    }
    else if (newPhone === '') {
      alert('Person phone cannot be empty!');
    }
    else if (!persons.some((person) => person.name === newName)) {
      const newPerson = { name: newName, number: newPhone };
      personsService
        .create(newPerson)
        .then((res) => {
          setPersons(persons.concat(res));
          setNewName('');
          setNewPhone('');
        });
    }
    else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  const deletePerson = (person) => {
    const shouldDelete = window.confirm(`Delete ${person.name}?`);
    if (shouldDelete) {
      personsService
        .remove(person.id)
        .then((res) => {
          setPersons(persons.filter((p) => p.id !== person.id));
        });
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <h2>Search</h2>
      <Search searchText={searchText} setSearchText={setSearchText} />

      <h2>Create</h2>
      <Form onSubmit={addPerson} name={newName} setName={setNewName} phone={newPhone} setPhone={setNewPhone} />

      <h2>Numbers</h2>
      <Persons persons={persons} searchText={searchText} handleDelete={deletePerson}/>
    </div>
  );
}

export default App;
