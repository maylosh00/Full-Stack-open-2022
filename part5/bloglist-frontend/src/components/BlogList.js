import Blog from './Blog'

const BlogList = ({blogs, updateBlog, removeBlog}) => {

  const sortedBlogs = blogs.sort((a, b) => a.likes > b.likes ? -1 : 1)
  return (
    <>
      <h2>blogs</h2>
      {sortedBlogs.map(blog =>
        <Blog 
          key={blog.id} 
          blog={blog}
          updateBlog={updateBlog}
          removeBlog={removeBlog}
        />
      )}
    </>
  )
}

export default BlogList