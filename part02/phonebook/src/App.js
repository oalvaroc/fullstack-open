import axios from "axios";
import { useEffect, useState } from "react";
import Form from "./Form";
import Persons from "./Persons";
import Search from "./Search";

const BASE_URL = 'http://localhost:3001';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [searchText, setSearchText] = useState('');

  // fetch persons list
  useEffect(() => {
    axios.get(`${BASE_URL}/persons`)
         .then((res) => setPersons(res.data))
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
      axios.post(`${BASE_URL}/persons`, newPerson)
          .then((res) => {
            setPersons(persons.concat(res.data));
            setNewName('');
            setNewPhone('');
          });
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
