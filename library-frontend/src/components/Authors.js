import React, { useState } from 'react'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  if (!props.show || !props.result.data) {
    return null
  }

  const authors = props.result.data.allAuthors

  const submit = async (e) => {
    e.preventDefault()
    await props.editAuthor({
      variables: { name, year: +year }
    })

    setName('')
    setYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <select value={name} onChange={({ target }) => setName(target.value)}>
          {authors.map(a => <option key={a.name} value={a.name}>{a.name}</option>)}
        </select>
        <div>
          born <input type="number" value={year} onChange={({ target }) => setYear(target.value)} />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors