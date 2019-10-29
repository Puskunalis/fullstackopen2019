import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = ({ person, deletePerson }) => (
  <div>
    {person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button>
  </div>
)

const Filter = props => (
  <form>
    <div>filter shown with <input value={props.search} onChange={props.handleSearchChange} /></div>
  </form>
)

const PersonForm = props => (
  <form onSubmit={props.addPerson}>
    <div>name: <input value={props.newName} onChange={props.handleNameChange} /></div>
    <div>number: <input value={props.newNumber} onChange={props.handleNumberChange} /></div>
    <div><button type="submit">add</button></div>
  </form>
)

const Persons = ({ persons, renderPerson }) => (
  persons.map(renderPerson)
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const handleNameChange = event => setNewName(event.target.value)

  const handleNumberChange = event => setNewNumber(event.target.value)

  const handleSearchChange = event => setSearch(event.target.value)

  const addPerson = event => {
    event.preventDefault()

    const samePerson = persons.find(person => person.name === newName)

    if (samePerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update({ ...samePerson, number: newNumber })
          .then(response => setPersons(persons.map(person => response.data.id === person.id ? response.data : person)))
      }
    } else {
      personService
        .create({ name: newName, number: newNumber })
        .then(response => setPersons(persons.concat(response.data)))
    }
  }

  const renderPerson = person => {
    if (person.name.toLowerCase().includes(search)) {
      return <Person key={person.name} person={person} deletePerson={deletePerson} />
    }
  }

  const deletePerson = person => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .remove(person)
        .then(() => setPersons(persons.filter(p => p.id !== person.id)))
    }
  }

  useEffect(() => {
    personService
      .getAll()
      .then((response) => setPersons(response.data))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter search={search} handleSearchChange={handleSearchChange} />

      <h2>add a new</h2>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Persons persons={persons} renderPerson={renderPerson} />
    </div>
  )
}

export default App