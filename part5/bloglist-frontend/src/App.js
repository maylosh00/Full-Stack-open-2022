import { useState, useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import BlogCreator from './components/BlogCreator'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import uuid from 'react-uuid'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState([])
  const [successMessage, setSuccessMessage] = useState([])

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])


  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage(errorMessage.slice(1))
    }, 5000)
    return () => clearTimeout(timer)
  }, [errorMessage])

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage(successMessage.slice(1))
    }, 5000)
    return () => clearTimeout(timer)
  }, [successMessage])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const returnedUser = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(returnedUser)
      )
      setUser(returnedUser)
      setUsername('')
      setPassword('')
      setSuccessMessage(successMessage.concat('Succesfully logged in.'))
      blogService.setToken(returnedUser.token)
    } catch(exception) {
      setErrorMessage(errorMessage.concat('Wrong credentials.'))
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setSuccessMessage(successMessage.concat('Succesfully logged out.'))
    setUser(null)
  }

  const createBlog = async blog => {
    const addedBlog = await blogService.addBlog(blog)
    if (addedBlog.error) {
      setErrorMessage(errorMessage.concat(addedBlog.error.response.data.error))
    }
    else {
      // updating blogs like this due to a bug with "user" field
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
      blogFormRef.current.toggleVisibility()
      setSuccessMessage(successMessage.concat(`Succesfully added blog "${addedBlog.title}" by ${addedBlog.author}.`))
    }
  }

  const updateBlog = async (id, blogObject) => {
    const updatedBlog = await blogService.updateBlog(id, blogObject)
    if (updatedBlog.error) {
      setErrorMessage(errorMessage.concat(updatedBlog.error.response.data.error))
    }
    else {
      // updating blogs like this due to a bug with "user" field
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
      setSuccessMessage(successMessage.concat(`Succesfully updated blog "${blogObject.title}".`))
    }
  }

  const removeBlog = async (blogToDelete) => {
    const removedBlog = await blogService.removeBlog(blogToDelete.id)
    if (removedBlog.error) {
      setErrorMessage(errorMessage.concat(removedBlog.error.response.data.error))
    }
    else {
      setSuccessMessage(successMessage.concat(`Succesfully deleted blog "${blogToDelete.title}".`))
      // updating blogs like this due to a bug with "user" field
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    }
  }

  return (
    <div>
      {errorMessage !== [] && errorMessage.map(message => <p key={uuid()} style={{ color: 'red' }}>{message}</p>)}
      {successMessage !== [] && successMessage.map(message => <p key={uuid()} style={{ color: 'green' }}>{message}</p>)}
      {
        user === null
          ?
          <LoginForm
            loginHandler={handleLogin}
            username={username}
            password={password}
            usernameHandler={({ target }) => setUsername(target.value)}
            passwordHandler={({ target }) => setPassword(target.value)}
          />
          :
          <>
            <BlogList
              blogs={blogs}
              updateBlog={updateBlog}
              removeBlog={removeBlog}
            />
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <BlogCreator
                createBlog={createBlog}
              />
            </Togglable>
            <button onClick={handleLogout}>log out</button>
          </>
      }
    </div>
  )
}

export default App
