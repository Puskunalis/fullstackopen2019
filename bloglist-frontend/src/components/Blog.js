import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addLike, removeBlog } from '../reducers/blogReducer'

const Blog = props => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const showButton = { display: props.blog.user.username === props.user.username ? '' : 'none' }

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
        {props.blog.title} {props.blog.author}
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.blog.url}<br />
        {props.blog.likes} likes<button onClick={() => props.addLike(props.blog)}>like</button><br />
        added by {props.blog.user.name ? props.blog.user.name : props.user.name}<br />
        <button style={props.blog.user.name ? showButton : { display: '' }} onClick={() => props.removeBlog(props.blog)}>remove</button>
      </div>
    </div>
  )
}

export default connect(
  null,
  { addLike, removeBlog }
)(Blog)