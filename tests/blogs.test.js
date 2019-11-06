const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')

const api = supertest(app)

let res

beforeEach(async () => {
  res = await api
    .get('/api/blogs')
})

test('blogs are returned as json', async () => {
  res
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const length = await Blog.countDocuments({})

  expect(res.body.length).toBe(length)
})

test('blogs have id property', async () => {
  res
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  expect(res.body[0].id).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})