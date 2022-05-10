import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [buttonLabel, setButtonLabel] = useState('hide')
  const [showInfo, setShowInfo] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  useEffect(() => {
    if (buttonLabel === 'view')
      setButtonLabel('hide')
    if (buttonLabel === 'hide')
      setButtonLabel('view')
  }, [showInfo])

  const handleClick = (event) => {
    event.preventDefault()
    console.log(blog)
    setShowInfo(!showInfo)
  }

  const updateLikesHandler = (event) => {
    event.preventDefault()
    const newBlogObject = {
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      user: blog.user.id,
      url: blog.url
    }
    updateBlog(blog.id, newBlogObject)
  }

  const removeBlogHandler = (event) => {
    event.preventDefault()
    if (window.confirm(`Do you really want to remove blog ${blog.title}?`))
      removeBlog(blog)
  }

  const loggedUserName = JSON.parse(window.localStorage.getItem('loggedUser')).username

  return (
    <div style={blogStyle}>
      {blog.title} <button onClick={handleClick}>{buttonLabel}</button>
      {showInfo
        ?
        <>
          {<p>{blog.url}</p>}
          {<p>likes: {blog.likes}<button onClick={updateLikesHandler}>like</button></p>}
          {<p>{blog.author}</p>}
          {blog.user.username === loggedUserName
            ? <button onClick={removeBlogHandler}>remove</button>
            : null}
        </>
        :
        null}

    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}


export default Blog