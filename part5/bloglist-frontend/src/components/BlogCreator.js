import { useState } from 'react'

const BlogCreator = ({createBlog}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogAddHandler = (event) => {
    event.preventDefault()
    createBlog({title, author, url})
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={blogAddHandler}>
      <h2>create new</h2>
      <div>
        title:
        <input 
          type='text'
          value={title}
          name='Title'
          onChange={({target}) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input 
          type='text'
          value={author}
          name='Author'
          onChange={({target}) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input 
          type='text'
          value={url}
          name='Url'
          onChange={({target}) => setUrl(target.value)}
        />
      </div>
      <button type="submit">add blog</button>
    </form>
  )
}

export default BlogCreator