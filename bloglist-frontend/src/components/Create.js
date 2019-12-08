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

  const style = {
    textAlign: 'center'
  }

  return (
    <div style={style}>
      <h2>create new</h2>
      <form style={{ border: 'solid', borderWidth: 3, borderColor: 'green', backgroundColor: 'lightGreen' }} onSubmit={addBlog}>
        <p>
          title:
          <input id="title" name="title" />
        </p>
        <p>
          author:
          <input id="author" name="author" />
        </p>
        <p>
          url:
          <input id="url" name="url" />
        </p>
        <button id="create-button" type="submit">create</button>
      </form>
    </div >
  )
}

export default connect(
  null,
  { createNotification, createBlog }
)(Create)