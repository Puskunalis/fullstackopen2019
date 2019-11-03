require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Person = require('./models/person')

mongoose.set('useFindAndModify', false)

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
  Person.countDocuments({}).then(count => {
    res.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${new Date()}</p>
  `)
  })
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()))
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person.toJSON())
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
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
    .then(() => {
      res.json(person)
    })
    .catch(error => {
      next(error)
    })
})

app.put('/api/persons/:id', (req, res) => {
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

  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))

  person.save()

  res.json(person)
})

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})