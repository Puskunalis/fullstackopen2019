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

const mostLikes = blogs => {
  var likes = {}

  _(blogs).countBy('author').toPairs().forEach(value => likes[value[0]] = 0)

  _(blogs).forEach(value => likes[value.author] += value.likes)

  likes = _(likes).toPairs().toArray().value()

  var maxIndex = 0

  for (let i = 1; i < likes.length; i++) {
    if (likes[i][1] > likes[maxIndex][1]) {
      maxIndex = i
    }
  }

  return { 'author': likes[maxIndex][0], 'likes': likes[maxIndex][1] }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}