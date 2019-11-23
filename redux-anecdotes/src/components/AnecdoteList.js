import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteList = props => {
  const anecdotes = props.visibleAnecdotes.sort((a, b) => b.votes - a.votes)

  const vote = anecdote => {
    props.addVote(anecdote.id)
    props.createNotification(`you voted '${anecdote.content}'`, 5)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
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

const anecdotesToShow = ({ anecdotes, filter }) => anecdotes.filter(a => a.content.toLowerCase().includes(filter))

const mapStateToProps = state => {
  return {
    visibleAnecdotes: anecdotesToShow(state),
    filter: state.filter
  }
}

export default connect(
  mapStateToProps,
  { createNotification, addVote }
)(AnecdoteList)