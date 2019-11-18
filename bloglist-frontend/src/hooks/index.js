import { useState } from 'react'
import axios from 'axios'

export const useField = type => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}

export const useResource = baseUrl => {
  let token = null

  const setToken = newToken => {
    token = `bearer ${newToken}`
  }

  const getAll = async () => {
    const request = await axios.get(baseUrl)
    return request.data
  }

  const create = async blog => {
    const config = {
      headers: { Authorization: token }
    }

    const response = await axios.post(baseUrl, blog, config)
    return response.data
  }

  const like = async blog => {
    const config = {
      headers: { Authorization: token }
    }

    const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
    return response.data
  }

  const remove = async blog => {
    const config = {
      headers: { Authorization: token }
    }

    const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
    return response.data
  }

  return { setToken, getAll, create, like, remove }
}