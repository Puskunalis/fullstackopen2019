const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const app = require('../app')

const api = supertest(app)

test('username must be at least 3 characters long', async () => {
  const newUser = {
    username: "ab",
    name: "Name Surname",
    password: "12345"
  }

  let usersAtStart = await User.find({})
  usersAtStart = usersAtStart.map(u => u.toJSON())

  const res = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  let usersAtEnd = await User.find({})
  usersAtEnd = usersAtEnd.map(u => u.toJSON())

  expect(usersAtEnd.length).toBe(usersAtStart.length)
})

test('password must be at least 3 characters long', async () => {
  const newUser = {
    username: "abcdef",
    name: "Name Surname",
    password: "1"
  }

  let usersAtStart = await User.find({})
  usersAtStart = usersAtStart.map(u => u.toJSON())

  const res = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  let usersAtEnd = await User.find({})
  usersAtEnd = usersAtEnd.map(u => u.toJSON())

  expect(usersAtEnd.length).toBe(usersAtStart.length)
})

afterAll(() => {
  mongoose.connection.close()
})