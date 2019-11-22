import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteList = props => {
  const anecdotes = props.store.getState().anecdotes

  const showNotification = message => {
    props.store.dispatch(createNotification(message))
    setTimeout(() => props.store.dispatch(createNotification(null)), 5000)
  }

  const vote = anecdote => {
    props.store.dispatch(addVote(anecdote.id))
    showNotification(`you voted '${anecdote.content}'`)
  }

  return (
    <div>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList