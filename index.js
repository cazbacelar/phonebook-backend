const express = require("express")
const app = express()

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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
