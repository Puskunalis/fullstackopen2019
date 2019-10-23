import React, { useState } from 'react'

const Person = ({ person }) => (
  <div>
    {person.name} {person.number}
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleSearchChange = (event) => setSearch(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    if (!Object.values(persons).map((object) => object.name).includes(newName)) {
      setPersons(persons.concat({ name: newName, number: newNumber }))
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const renderPerson = (person) => {
    if (person.name.toLowerCase().includes(search)) {
      return <Person key={person.name} person={person} />
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>filter shown with<input value={search} onChange={handleSearchChange} /></div>
      </form>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      {persons.map(renderPerson)}
    </div>
  )
}

export default App