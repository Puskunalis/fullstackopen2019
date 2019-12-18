import React, { useState } from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState(null)

  if (!props.show || !props.result.data) {
    return null
  }

  const books = props.result.data.allBooks

  const allGenres = []

  books.map(book => book.genres.map(genre => allGenres.push(genre)))

  const genres = new Set(allGenres)

  return (
    <div>
      <h2>books</h2>
      {genre && <div>in genre <b>{genre}</b></div>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.filter(book => genre === null || book.genres.indexOf(genre) >= 0).map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {[...genres].map(genre =>
        <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
      )}
    </div>
  )
}

export default Books