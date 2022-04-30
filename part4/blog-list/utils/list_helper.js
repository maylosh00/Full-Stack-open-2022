const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  return blogs.reduce((sum, current) => sum += current.likes, 0)
}

const favouriteBlog = blogs => {
  if (blogs.length === 0)
    return null
  const result = blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)
  return {
    title: result.title,
    author: result.author,
    likes: result.likes
  }
}

const mostBlogs = blogs => {
  if (blogs.length === 0)
    return null
  
  const authors = []
  blogs.forEach(blog => {
    // checks if blog's author is already in the array, if so then it goes to the next blog
    if (!authors.some(obj => obj.author === blog.author))
      authors.push({ 
        author: blog.author, 
        // calculates amount of blogs for the author
        blogs: blogs.reduce((sum, current) => current.author === blog.author ? sum += 1 : sum = sum, 0)
      })
  })
  // returns one with the most blogs
  return authors.reduce((max, author) => max.blogs > author.blogs ? max : author)
}

const mostLikes = blogs => {
  if (blogs.length === 0)
    return null
  
  const authors = []
  blogs.forEach(blog => {
    // checks if blog's author is already in the array, if so then it goes to the next blog
    if (!authors.some(obj => obj.author === blog.author))
      authors.push({ 
        author: blog.author, 
        // calculates amount of blogs for the author
        likes: blogs.reduce((sum, current) => current.author === blog.author ? sum += current.likes : sum = sum, 0)
      })
  })
  // returns one with the most blogs
  return authors.reduce((max, author) => max.likes > author.likes ? max : author)
}


module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes }