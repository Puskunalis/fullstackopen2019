const _ = require('lodash')

const dummy = blogs => 1

const totalLikes = blogs => blogs.reduce((likes, blog) => likes + blog.likes, 0)

const favoriteBlog = blogs => {
  const max = blogs.reduce((a, b) => (a.likes > b.likes) ? a : b)

  delete max._id
  delete max.url
  delete max.__v

  return max
}

const mostBlogs = blogs => {
  const obj = _(blogs).countBy('author').toPairs().reduce((a, b) => (a[1] > b[1]) ? a : b)

  return { "author": obj[0], "blogs": obj[1] }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}