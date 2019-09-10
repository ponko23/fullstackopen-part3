const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423121",
    id: 4
  }
]

app.get('/info', (req, res) => {
  res.send(
    `Phonebook has info for ${persons.length} people<br />
    ${new Date().toString()}`
  )
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

const generatedId = () => {
  let id = 0
  for(let i = 0; i < 10; i++) {
    id = Math.floor(Math.random() * 100000)
    if (!persons.find(person => person.id === id)) {
      return id
    }
  }
  const maxId = notes.length > 0
    ? Math.max(...persons.map(person => person.id))
    : 0
  return maxId + 1
}

app.post('/api/persons', (req, res) => {
  const body = req.body

  if(!body.name) {
    return res.status(400).json({
      error: 'name missing'
    })
  }
  if(!body.number) {
    return res.status(400).json({
      error: 'number missing'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    date: new Date(),
    id: generatedId(),
  }
  persons = persons.concat(person)

  res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    persons = persons.filter(person => person.id !== id)
    res.json(person)
  } else {
    res.status(404).end()
  }
})



const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})