import React, { useState } from 'react'

const Blog = ({ blog, sendLike, remove, user }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const showButton = { display: blog.user.username === user.username ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      <div onClick={() => toggleVisibility()} className="blog">
        {blog.title} {blog.author}
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {blog.url}<br />
        {blog.likes} likes<button onClick={async () => await sendLike(blog)}>like</button><br />
        added by {blog.user.name}<br />
        <button style={showButton} onClick={async () => await remove(blog)}>remove</button>
      </div>
    </div>
  )
}

export default Blog