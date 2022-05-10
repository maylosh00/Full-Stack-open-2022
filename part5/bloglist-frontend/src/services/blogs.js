import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addBlog = async (blog) => {
  try {
    const config = {
      headers: { Authorization: token}
    }
    const request = await axios.post(baseUrl, blog, config)
    return request.data
  } catch(exception) {
    return {error: exception}
  }
}

const updateBlog = async (id, blog) => {
  try {
    const request = await axios.put(`${baseUrl}/${id}`, blog)
    return request.data
  } catch(exception) {
    return {error: exception}
  }
}

const removeBlog = async (id) => {
  try {
    const config = {
      headers: { Authorization: token}
    }
    const request = await axios.delete(`${baseUrl}/${id}`, config)
    return request.data
  } catch(exception) {
    return {error: exception}
  }
}


export default { getAll, addBlog, updateBlog, setToken, removeBlog }