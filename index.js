const express = require("express")
const app = express()
app.use(express.json())

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
]

// application's / root
app.get("/", (request, response) => {
  response.send("<h1>Root</h1>")
})

// returns info
app.get("/info", (request, response) => {
  const length = persons.length
  const currentTime = new Date()

  response.send(
    `<p>Phonebook has info for ${length} people.</p><p>Request received at ${currentTime}</p>`
  )
})

// returns all persons
app.get("/api/persons", (request, response) => {
  response.json(persons)
})

// returns a single phonebook entry
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find((person) => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.statusMessage = "Phonebook entry with given id not found"
    response.status(404).send("No phonebook entry with the given id was found")
  }
})

// deletes a single hponebook entry
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const generateId = () => {
  const maxId = 1000000 // Set a maximum value for the ID
  const minId = 1 // Set a minimum value for the ID
  const randomId = Math.floor(Math.random() * maxId) + minId // Generate a random integer between minId and maxId
  return randomId
}

const checkDuplicates = (newName) => {
  const names = persons.map((person) => person.name)
  return names.some((name) => name === newName)
}

// adds a new phonebook entry
app.post('/api/persons', (request, response) => {
  const body = request.body

  // If the received data is missing a value for the name or the number property, the server will respond to the request with the status code 400 bad request
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name and number must be added"
    })
  } else if (checkDuplicates(body.name)) {
    return response.status(400).json({
      error: "name must be unique"
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)
  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
