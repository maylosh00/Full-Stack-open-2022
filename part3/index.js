require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')

app.use(express.json())
app.use(express.static('build'))

const cors = require('cors')
app.use(cors())


const morgan = require('morgan')
morgan.token('req-body', (req, res) => {
    if (req.method === 'POST')
        return JSON.stringify(req.body)
    else
        return ''
})
app.use(morgan(
    ':method :url :status :res[content-length] - :response-time ms :req-body'
    ))

app.get('/api/persons', (req, res) => {
    Person.find({}).then(person => {
        res.json(person)
    })
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    Person.findById(id).then(person => {
        res.json(person)
    })
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    
    if (!body.name) {
        return res.status(400).json({error: 'name missing'})
    } 
    else if (!body.number) {
        return res.status(400).json({error: 'number missing'})
    } 
    else if (!body.number && !body.name) {
        return res.status(400).json({error: 'name and number missing'})
    } 
    else if (persons.some(person => person.name === body.name)) {
        return res.status(400).json({error: 'name must be unique'})
    }
    else {
        const person = new Person({
            name: body.name,
            number: body.number
        })
    
        person.save().then(savedPerson => {
            res.json(savedPerson)
        })
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

