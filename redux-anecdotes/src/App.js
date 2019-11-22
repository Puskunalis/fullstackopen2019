import React from 'react'
import { connect } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = props => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {props.notification ? <Notification /> : ''}
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

export default connect(mapStateToProps)(App)