const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response, next) => {
  try {
    blogs = await Blog.find({})
    response.json(blogs)
  } catch(exception) {
    next(exception)
  }

})

blogRouter.post('/', async (request, response, next) => {

  try {
    const blog = new Blog(request.body)
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogRouter