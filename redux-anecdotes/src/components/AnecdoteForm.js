import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteForm = props => {
  const showNotification = message => {
    props.store.dispatch(createNotification(message))
    setTimeout(() => props.store.dispatch(createNotification(null)), 5000)
  }

  const addAnecdote = event => {
    event.preventDefault()
    props.store.dispatch(createAnecdote(event.target.anecdote.value))
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

export default AnecdoteForm