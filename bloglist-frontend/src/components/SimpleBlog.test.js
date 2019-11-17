import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  const blog = {
    title: 'Title',
    author: 'Author',
    likes: 10
  }

  let component

  const mockHandler = jest.fn()

  beforeEach(() => {
    component = render(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    )
  })

  test('renders title', () => {
    expect(component.container).toHaveTextContent(blog.title)
  })

  test('renders author', () => {
    expect(component.container).toHaveTextContent(blog.author)
  })

  test('renders likes', () => {
    expect(component.container).toHaveTextContent('' + blog.likes)
  })

})