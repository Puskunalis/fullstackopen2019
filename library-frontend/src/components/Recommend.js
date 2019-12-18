import React from 'react'

const Recommend = (props) => {
  if (!props.show || !props.result.data) {
    return null
  }

  const books = props.result.data.allBooks
  const favoriteGenre = props.me.data.me.favoriteGenre

  return (
    <div>
      <h2>recommendations</h2>
      books in your favorite genre <b>{favoriteGenre}</b>
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
          {books.filter(book => book.genres.indexOf(favoriteGenre) >= 0).map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend