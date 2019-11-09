import React from 'react'
import blogService from '../services/blogs'

const Create = ({ showNotification, blogs, title, author, url, setBlogs, setTitle, setAuthor, setUrl }) => {
  const createBlog = async event => {
    event.preventDefault()
    const newBlog = { 'title': title, 'author': author, 'url': url }
    const response = await blogService.create(newBlog)
    setBlogs(blogs.concat(response))
    showNotification(`a new blog ${title} by ${author} added`, true)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <div>
          title:
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
        <input
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default Create