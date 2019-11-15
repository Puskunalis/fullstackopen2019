import React, { useState } from 'react'

const Blog = ({ blog }) => {
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
        {blog.likes} likes<button>like</button><br />
        added by {blog.user.name}
      </div>
    </div>
  )
}

export default Blog