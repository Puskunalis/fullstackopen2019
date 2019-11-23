import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = props => {
  const showNotification = message => {
    props.createNotification(message)
    setTimeout(() => props.createNotification(null), 5000)
  }

  const addAnecdote = async event => {
    event.preventDefault()

    const content = event.target.anecdote.value
    showNotification(`created '${content}'`)
    event.target.anecdote.value = ''

    const newAnecdote = await anecdoteService.addNew(content)
    props.createAnecdote(newAnecdote)
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