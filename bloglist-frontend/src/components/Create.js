import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'

const Create = props => {
  const addBlog = async event => {
    event.preventDefault()

    const newBlog = {
      'title': event.target.title.value,
      'author': event.target.author.value,
      'url': event.target.url.value
    }

    props.createBlog(newBlog)
    props.createNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, 5)

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input name="title" />
        </div>
        <div>
          author:
          <input name="author" />
        </div>
        <div>
          url:
          <input name="url" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default connect(
  null,
  { createNotification, createBlog }
)(Create)