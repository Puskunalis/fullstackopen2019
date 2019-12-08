const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })

  res.json(blogs)
})

blogsRouter.post('/', async (req, res, next) => {
  if (req.body.likes === undefined) {
    req.body.likes = 0
  }

  if (req.body.title === undefined || req.body.url === undefined) {
    return res.status(400).json({ 'error': 'title or url missing' })
  }

  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!req.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    req.body.user = user.id

    const blog = new Blog(req.body)
    const result = await blog.save()

    user.blogs = user.blogs.concat(blog._id)
    await user.save()

    res.status(201).json(result)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!req.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(req.params.id)

    if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndRemove(req.params.id)
      res.status(204).end()
    }
  } catch {
    res.status(400).json({ 'error': 'blog not found' })
  }
})

blogsRouter.put('/:id', async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { likes: req.body.likes }, { new: true })

    res.json(updatedBlog.toJSON())
  } catch {
    res.status(400).json({ 'error': 'blog not found' })
  }
})

module.exports = blogsRouter