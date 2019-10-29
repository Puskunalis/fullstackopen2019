import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => (
  axios.get(baseUrl)
)

const create = newObject => (
  axios.post(baseUrl, newObject)
)

const remove = person => (
  axios.delete(`${baseUrl}/${person.id}`)
)

const update = person => {
  return axios.put(`${baseUrl}/${person.id}`, person)
}

export default { getAll, create, remove, update }