const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })

  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  if (req.body.likes === undefined) {
    req.body.likes = 0
  }

  if (req.body.title === undefined || req.body.url === undefined) {
    return res.status(400).json({ 'error': 'title or url missing' })
  }

  const user = await User.findOne({})

  req.body.user = user.id

  const blog = new Blog(req.body)
  const result = await blog.save()

  user.blogs = user.blogs.concat(blog._id)
  await user.save()

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

blogsRouter.put('/:id', async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { likes: req.body.likes }, { new: true })

    res.json(updatedBlog.toJSON())
  } catch {
    res.status(400).json({ 'error': 'blog not found' })
  }
})

module.exports = blogsRouter