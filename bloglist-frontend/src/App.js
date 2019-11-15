import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Create from './components/Create'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [message, setMessage] = useState([null, true])
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const showNotification = (text, success) => {
    setMessage([text, success])
    setTimeout(() => setMessage([null, true]), 5000)
  }

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      setMessage([null, true])
    } catch (exception) {
      showNotification('wrong username or password', false)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const logout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} />
        {loginForm()}
      </div>
    )
  }

  const sendLike = async blog => {
    await blogService.like({ ...blog, likes: blog.likes + 1 })
    setBlogs(blogs.map(b => b.id === blog.id ? { ...b, likes: b.likes + 1 } : b))
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={message} />

      <p>
        {user.username} logged in
        <button onClick={logout}>logout</button>
      </p>

      <Togglable buttonLabel="new blog">
        <Create showNotification={showNotification} blogs={blogs} title={title} author={author} url={url} setBlogs={setBlogs} setTitle={setTitle} setAuthor={setAuthor} setUrl={setUrl} />
      </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} sendLike={sendLike} />
      )}
    </div>
  )
}

export default App