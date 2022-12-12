import { useEffect, useState } from "react";
import Form from "./Form";
import Persons from "./Persons";
import Search from "./Search";
import Status from "./Status";

import personsService from './services/persons'

import './styles/index.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState(null);

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
      createPerson(newPerson)
        .then(() => {
          setStatus(`Added ${newPerson.name}`);
          setTimeout(() => {
            setStatus(null);
          }, 2000);
        });
    }
    else {
      const shouldUpdate = window.confirm(
        `${newName} is already added to the phonebook, replace the old number with new one?`
      );
      if (shouldUpdate) {
        const oldPerson = persons.find((p) => p.name === newName);
        const newPerson = { ...oldPerson, number: newPhone };
        updatePerson(newPerson)
          .then(() => {
            setStatus(`Updated ${newPerson.name}`);
            setTimeout(() => {
              setStatus(null);
            }, 2000);
          });
      }
    }
  };

  const createPerson = (person) => {
    return personsService
      .create(person)
      .then((res) => {
        setPersons(persons.concat(res));
        setNewName('');
        setNewPhone('');
      });
  }

  const updatePerson = (newPerson) => {
    return personsService
      .update(newPerson)
      .then((res) => {
        setPersons(persons.map((p) => p.name === res.name ? res : p));
      });
  }

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

      <Status msg={status} />

      <h2>Search</h2>
      <Search searchText={searchText} setSearchText={setSearchText} />

      <h2>Create</h2>
      <Form onSubmit={addPerson} name={newName} setName={setNewName} phone={newPhone} setPhone={setNewPhone} />

      <h2>Numbers</h2>
      <Persons persons={persons} searchText={searchText} handleDelete={deletePerson} />
    </div>
  );
}

export default App;
