const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  
  if (!request.token)
    return response.status(401).json({ error: 'token missing' })
  jwt.verify(request.token, process.env.SECRET)

  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: user.name || body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {

  if (!request.token)
    return response.status(401).json({ error: 'token missing' })

  // const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const blog = await Blog.findById(request.params.id)
  if (!blog)
    return response.status(400).json({ error: 'blog not found' })

  const user = request.user
  if (user.id !== blog.user.toString())
    return response.status(401).json({ error: 'invalid token' })

  await Blog.findByIdAndRemove(request.params.id)
  return response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes 
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(200).json(updatedBlog)
})

module.exports = blogRouter