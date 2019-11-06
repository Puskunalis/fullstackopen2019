const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
  const res = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const length = await Blog.countDocuments({})

  expect(res.body.length).toBe(length)
})

afterAll(() => {
  mongoose.connection.close()
})