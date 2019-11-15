import React, { useState } from 'react'

const Blog = ({ blog, sendLike, remove }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

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
      <div onClick={() => toggleVisibility()}>
        {blog.title} {blog.author}
      </div>
      <div style={showWhenVisible}>
        {blog.url}<br />
        {blog.likes} likes<button onClick={async () => await sendLike(blog)}>like</button><br />
        added by {blog.user.name}<br />
        <button onClick={async () => await remove(blog)}>remove</button>
      </div>
    </div>
  )
}

export default Blog