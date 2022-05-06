const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const initialUsers = [
  {
  username: "maylosh",
  password: "password",
  _id: "62751e9dff88b7e4cbdfd437"
  },
  {
  username: "john-snow",
  password: "password",
  _id: "62751ec6ff88b7e4cbdfd43b"
  },
  {
  username: "jan",
  password: "password",
  _id: "62751eceff88b7e4cbdfd43e"
  }
]

const initialBlogs = [
  {
  title: "super blog 300",
  author: "Miłoszek",
  url: "miloszek.com",
  likes: 0,
  user: "62751e9dff88b7e4cbdfd437",
  },
  {
  title: "super blog 400",
  author: "Miłoszek",
  url: "miloszek.com",
  likes: 0,
  user: "62751e9dff88b7e4cbdfd437",
  },
  {
  title: "some GoT stuff",
  author: "John Snow",
  url: "johnsnow.com",
  likes: 0,
  user: "62751ec6ff88b7e4cbdfd43b",
  }
]



const getTokenForUser = async username => {
  const user = await User.findOne({ username })
  return jwt.sign({username: user.username, id: user._id}, process.env.SECRET)
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(note => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = { 
  initialBlogs, 
  initialUsers, 
  blogsInDb, 
  usersInDb, 
  getTokenForUser 
}