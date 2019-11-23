const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)

      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }

      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    case 'ADD':
      return state.concat(action.data.content)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const createAnecdote = content => ({
  type: 'ADD',
  data: { content }
})

export const addVote = id => ({
  type: 'VOTE',
  data: { id }
})

export const initializeAnecdotes = anecdotes => ({
  type: 'INIT_ANECDOTES',
  data: anecdotes
})

export default anecdoteReducer