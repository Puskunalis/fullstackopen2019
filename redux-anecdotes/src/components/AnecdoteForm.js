import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteForm = props => {
  const showNotification = message => {
    props.createNotification(message)
    setTimeout(() => props.createNotification(null), 5000)
  }

  const addAnecdote = event => {
    event.preventDefault()
    props.createAnecdote(event.target.anecdote.value)
    showNotification(`created '${event.target.anecdote.value}'`)
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default connect(
  null,
  { createNotification, createAnecdote }
)(AnecdoteForm)