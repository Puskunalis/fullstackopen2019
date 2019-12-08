import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addLike, removeBlog } from '../reducers/blogReducer'

const Blog = props => {
  const [visible, setVisible] = useState(false)

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
        <a href={`/blogs/${props.blog.id}`}>{props.blog.title} {props.blog.author}</a>
      </div>
    </div>
  )
}

export default connect(
  null,
  { addLike, removeBlog }
)(Blog)