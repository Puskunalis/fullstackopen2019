import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'LIKE':
      const changedBlog = action.data

      return state.map(blog =>
        blog.id !== changedBlog.id ? blog : { ...changedBlog, user: blog.user }
      ).sort((a, b) => b.likes - a.likes)
    case 'CREATE':
      return state.concat(action.data).sort((a, b) => b.likes - a.likes)
    case 'INIT_BLOGS':
      return action.data.sort((a, b) => b.likes - a.likes)
    case 'REMOVE':
      return state.filter(blog => blog.id !== action.data)
    case 'ADD_COMMENT':
      return state.map(blog => blog.id === action.data.id ? action.data : blog)
    default:
      return state
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'CREATE',
      data: newBlog
    })
  }
}

export const addLike = blog => {
  return async dispatch => {
    const newBlog = await blogService.like(blog)
    dispatch({
      type: 'LIKE',
      data: newBlog
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const removeBlog = blog => {
  if (window.confirm(`remove blog ${blog.title}`)) {
    return async dispatch => {
      await blogService.remove(blog)
      dispatch({
        type: 'REMOVE',
        data: blog.id
      })
    }
  } else {
    return async dispatch => {

    }
  }
}

export const addComment = (blog, comment) => {
  return async dispatch => {
    const blogData = await blogService.addComment(blog, comment)
    dispatch({
      type: 'ADD_COMMENT',
      data: blogData
    })
  }
}

export default blogReducer