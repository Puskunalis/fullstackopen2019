require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Person = require('./models/person')

app.use(bodyParser.json())

morgan.token('body', function (req, res) {
  if (req.method == 'POST') {
    return JSON.stringify(req.body)
  } else {
    return ' '
  }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(express.static('build'))

app.get('/info', (req, res) => {
  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `)
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()))
  })
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const person = new Person({
    name: req.body.name,
    number: req.body.number
  })

  const error = text => res.status(400).json({ error: text })

  if (!person.name) {
    return error('name is missing')
  } else if (!person.number) {
    return error('number is missing')
  }

  person.save()

  res.json(person)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})