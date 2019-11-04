const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((likes, blog) => likes + blog.likes, 0)

const favoriteBlog = (blogs) => {
  const max = blogs.reduce((a, b) => {
    return (a.likes > b.likes) ? a : b
  })

  delete max._id
  delete max.url
  delete max.__v
  
  return max
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}