const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./testHelper')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promises = blogObjects.map(blog => blog.save())
  await Promise.all(promises)
})

describe('BlogAPI', () => {
  test('correct amount of notes in json format are returned', async () => {
    const blogs = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    expect(blogs.body).toHaveLength(helper.initialBlogs.length)
  })

  test('unique id property of blog is named id instead of _id', async () => {
    const blogs = await api
      .get('/api/blogs')

    expect(blogs.body[0].id).toBeDefined()
    expect(blogs.body[0]._id).not.toBeDefined()
  })

  test('adding blog saves blog to the db, its name checks out', async () => {
    const newBlogObject = {
      title: "Crazy blog about crazy things",
      author: "Miłosz Staniszewski",
      url: "https://miloszstaniszewski.com/",
      likes: 7
    }

    await api
      .post('/api/blogs')
      .send(newBlogObject)
      .expect(201)

    const blogs = await api.get('/api/blogs')
    expect(blogs.body).toHaveLength(helper.initialBlogs.length + 1)

    const blogInDb = blogs.body[blogs.body.length - 1]
    expect(blogInDb.title).toEqual('Crazy blog about crazy things')
  })

  test('if blog with likes property missing is added, likes defaults to 0', async () => {
    const newBlogObject = {
      title: "Crazy blog about crazy things",
      author: "Miłosz Staniszewski",
      url: "https://miloszstaniszewski.com/",
    }

    await api
      .post('/api/blogs')
      .send(newBlogObject)
      .expect(201)

    const blogs = await api.get('/api/blogs')
    const blogInDb = blogs.body[blogs.body.length - 1]
    expect(blogInDb.likes).toEqual(0)
  })

  test('if blog with no author or title property gets added, returns 400', async () => {
    const noTitleBlogObject = {
      author: "Miłosz Staniszewski",
      url: "https://miloszstaniszewski.com/",
    }
    const noAuthorBlogObject = {
      title: "Crazy blog about crazy things",
      url: "https://miloszstaniszewski.com/",
    }

    await api
      .post('/api/blogs')
      .send(noTitleBlogObject)
      .expect(400)
    await api
      .post('/api/blogs')
      .send(noAuthorBlogObject)
      .expect(400)

  })
})

afterAll(() => {
  mongoose.connection.close()
})