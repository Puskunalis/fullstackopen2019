import React from 'react'

const Notification = ({ message }) => {
  const style = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message[0] === null) {
    return null
  }

  if (message[1]) {
    style.color = 'green'
  }

  return (
    <div style={style}>
      {message[0]}
    </div>
  )
}

export default Notification