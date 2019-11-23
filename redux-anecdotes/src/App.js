import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import anecdoteService from './services/anecdotes'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = props => {
  useEffect(() => {
    anecdoteService.getAll().then(anecdotes => props.initializeAnecdotes(anecdotes))
  }, [])

  return (
    <div>
      <h1>Programming anecdotes</h1>
      <Filter />
      <Notification />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes,
    notification: state.notification,
    filter: state.filter
  }
}

export default connect(mapStateToProps, { initializeAnecdotes })(App)