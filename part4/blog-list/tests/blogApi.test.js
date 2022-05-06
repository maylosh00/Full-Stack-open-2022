const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./testHelper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const userObjects = helper.initialUsers.map(user => new User(user))
  const userPromises = userObjects.map(user => user.save())
  await Promise.all(userPromises)

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const blogPromises = blogObjects.map(blog => blog.save())
  await Promise.all(blogPromises)
  
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

  test('Correct amount of users in json format is returned', async () => {
    const users = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(users.body).toHaveLength(helper.initialUsers.length)
  })

  test('adding blog without token returns 404', async () => {
    const newBlogObject = {
      title: "some blog",
      author: "Miłosz Staniszewski",
      url: "https://miloszstaniszewski.com/"
    }
    await api
      .post('/api/blogs')
      .send(newBlogObject)
      .expect(401)
  })

  test('adding blog with wrong token returns 404', async () => {
    const newBlogObject = {
      title: "some blog",
      author: "Miłosz Staniszewski",
      url: "https://miloszstaniszewski.com/"
    }
    const token = "false token"
    await api
      .post('/api/blogs')
      .send(newBlogObject)
      .set('Authorization', `bearer ${token}`)
      .expect(401)
  })

  test('adding blog with token saves blog to the db, its name checks out', async () => {

    const newBlogObject = {
      title: "Crazy blog about crazy things",
      author: "Miłosz Staniszewski",
      url: "https://miloszstaniszewski.com/",
      likes: 7
    }
    const token = await helper.getTokenForUser("maylosh")
  
    await api
      .post('/api/blogs')
      .send(newBlogObject)
      .set('Authorization', `bearer ${token}`)
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
    const token = await helper.getTokenForUser("maylosh")

    await api
      .post('/api/blogs')
      .send(newBlogObject)
      .set('Authorization', `bearer ${token}`)
      .expect(201)

    const blogs = await api.get('/api/blogs')
    const blogInDb = blogs.body[blogs.body.length - 1]
    expect(blogInDb.likes).toEqual(0)
  })

  test('if blog with no title property gets added, returns 400', async () => {
    const noTitleBlogObject = {
      author: "Miłosz Staniszewski",
      url: "https://miloszstaniszewski.com/",
    }
    const token = await helper.getTokenForUser("maylosh")

    await api
      .post('/api/blogs')
      .send(noTitleBlogObject)
      .set('Authorization', `bearer ${token}`)
      .expect(400)
  })

  test('deleting blogs without token returns 401', async () => {
    const user = await User.findOne({username: "maylosh"})
    const blog = await Blog.findOne({user: user._id})

    await api
      .delete(`/api/blogs/${blog.id}`) 
      .expect(401)
  })

  test('deleting blogs with token works correctly', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const user = await User.findOne({username: "maylosh"})
    const blog = await Blog.findOne({user: user._id})
    const token = await helper.getTokenForUser("maylosh")

    await api
      .delete(`/api/blogs/${blog.id}`)
      .set('Authorization', `bearer ${token}`)   
      .expect(204)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).not.toContain(blog.title)
  })

  // THIS DOES NOT CHECK THE TOKEN, IMPLEMENTATION IN PUT METHOD MISSING
  test('updating blogs works correctly', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogAtStart = blogsAtStart[0]
    const changedBlog = { ...blogAtStart, likes: blogAtStart.likes + 1 }

    await api
      .put(`/api/blogs/${blogAtStart.id}`)
      .send(changedBlog)
      .expect(200)
    
    const blogsAtEnd = await helper.blogsInDb()
    const blogAtEnd = blogsAtEnd[0]
    expect(blogAtEnd.likes).toEqual(blogAtStart.likes + 1)

  })
})

afterAll(() => {
  mongoose.connection.close()
})