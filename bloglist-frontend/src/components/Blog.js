import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addLike, removeBlog } from '../reducers/blogReducer'

const Blog = props => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 2,
    margin: 3,
    backgroundColor: 'lightBlue'
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      <div onClick={() => toggleVisibility()} className="blog">
        <Link style={{ fontSize: 25 }} to={`/blogs/${props.blog.id}`}>{props.blog.title} {props.blog.author}</Link>
      </div>
    </div>
  )
}

export default connect(
  null,
  { addLike, removeBlog }
)(Blog)