const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./testHelper')

beforeEach(async () => {
  await User.deleteMany({})

  const userObjects = helper.initialUsers.map(user => new User(user))
  const promises = userObjects.map(user => user.save())
  await Promise.all(promises)
})

describe('Adding users', () => {
  test('Correct amount of users in json format is returned', async () => {
    const users = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(users.body).toHaveLength(helper.initialUsers.length)
  })

  test('Adding user works correctly', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUserObject = {
      username: "crazyGuy3000",
      name: "Crazy Bro",
      password: "crazy-password"
    }
    await api
      .post('/api/users')
      .send(newUserObject)
      .expect(201)

    const usersAtEnd = await helper.usersInDb()
    // console.log(usersAtStart.length, usersAtEnd.length)
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  })

  test('Adding user with username or password shorter than 3 signs returns 400', async () => {
    const usersAtStart = await helper.usersInDb()

    const userWithWrongUsername = {
      username: "mi",
      name: "mi",
      password: "password"
    }
    const userWithWrongPassword = {
      username: "maylosh",
      name: "maylosh",
      password: "pa"
    }
    await api
      .post('/api/users')
      .send(userWithWrongUsername)
      .expect(400)
    await api
      .post('/api/users')
      .send(userWithWrongPassword)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

