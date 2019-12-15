import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from "@apollo/react-hooks"

const getToken = () => {
  const token = localStorage.getItem('user')
  return token ? `Bearer ${token.substring(1, token.length - 1)}` : ''
}

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  request: (operation) => {
    operation.setContext({
      headers: {
        authorization: getToken(),
      },
    })
  }
})

ReactDOM.render(
  <ApolloProvider client={client} >
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)