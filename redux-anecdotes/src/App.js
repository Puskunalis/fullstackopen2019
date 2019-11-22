import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = props => {
  return (
    <div>
      <h2>Anecdotes</h2>
      {props.store.getState().notification ? <Notification store={props.store} /> : ''}
      <AnecdoteForm store={props.store} />
      <AnecdoteList store={props.store} />
    </div>
  )
}

export default App