import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const user = {
    name: 'Name',
    username: 'Username'
  }

  const blog = {
    title: 'Title',
    author: 'Author',
    likes: 10,
    user: user
  }

  const uselessFunc = () => undefined

  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog} sendLike={uselessFunc} remove={uselessFunc} user={user} />
    )
  })

  test('renders title', () => {
    expect(component.container).toHaveTextContent(blog.title)
  })

  test('renders author', () => {
    expect(component.container).toHaveTextContent(blog.author)
  })

  test('after clicking the title, more information is displayed', () => {
    const blogToClick = component.getByText(blog.title + ' ' + blog.author)

    fireEvent.click(blogToClick)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

})