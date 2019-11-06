const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})

  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  if (req.body.likes === undefined) {
    req.body.likes = 0
  }

  if (req.body.title === undefined || req.body.url === undefined) {
    return res.status(400).json({ 'error': 'title or url missing' })
  }

  const blog = new Blog(req.body)

  const result = await blog.save()

  res.status(201).json(result)
})

blogsRouter.delete('/:id', async (req, res) => {
  try {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } catch {
    res.status(400).json({ 'error': 'blog not found' })
  }
})

module.exports = blogsRouter