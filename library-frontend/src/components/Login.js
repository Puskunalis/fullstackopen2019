import React, { useState } from 'react'

const Login = ({ login, setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submit = async (e) => {
    e.preventDefault()

    const response = await login({
      variables: { username, password }
    })

    try {
      window.localStorage.setItem(
        'user', JSON.stringify(response.data.login.value)
      )

      setUser(JSON.stringify(response.data.login.value))
    } catch (e) {

    }
  }

  return (
    <form onSubmit={submit}>
      <div>
        username <input value={username} onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default Login