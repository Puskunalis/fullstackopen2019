import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = ({ person }) => (
  <div>
    {person.name} {person.number}
  </div>
)

const Filter = (props) => (
  <form>
    <div>filter shown with <input value={props.search} onChange={props.handleSearchChange} /></div>
  </form>
)

const PersonForm = (props) => (
  <form onSubmit={props.addPerson}>
    <div>name: <input value={props.newName} onChange={props.handleNameChange} /></div>
    <div>number: <input value={props.newNumber} onChange={props.handleNumberChange} /></div>
    <div><button type="submit">add</button></div>
  </form>
)

const Persons = (props) => (
  props.persons.map(props.renderPerson)
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleSearchChange = (event) => setSearch(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()

    if (!persons.find(person => person.name === newName)) {
      const newPerson = { name: newName, number: newNumber }

      personService
        .create(newPerson)
        .then(() => setPersons(persons.concat(newPerson)))
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const renderPerson = (person) => {
    if (person.name.toLowerCase().includes(search)) {
      return <Person key={person.name} person={person} />
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