const express = require("express");
const app = express();
const cors = require("cors");
// morgan is a Node.js and Express middleware to log HTTP requests and errors, and simplifies the process.
const morgan = require("morgan");
// important that dotenv gets imported before the person model is imported
require("dotenv").config();

const Person = require("./models/person");

// define a custom token for morgan
morgan.token("req-body", (req, res) => {
  // the custom token "req-body" is defined using the morgan.token method
  if (req.method === "POST") {
    // the custom token checks if the HTTP method is "POST"
    return JSON.stringify(req.body);
    // if so, it returns the stringified request body
  }
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(cors());
// middleware to parse JSON in requests bodies
app.use(express.json());
// app.use(morgan('tiny'));
// Use morgan middleware with the tiny format + the custom token
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :req-body"
  )
);
app.use(express.static("build"));

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
];

// application's / root
app.get("/", (request, response) => {
  response.send("<h1>Root</h1>");
});

// returns info
app.get("/info", (request, response) => {
  Person.find({}).then((persons) => {
    response.send(
      `<p>Phonebook has info for ${
        persons.length
      } people.</p><p>Request received at ${new Date()}</p>`
    );
  });
});

// fetching all phonebook entries from the database
app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
  // response.json(persons);
});

// returns a single phonebook entry
app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.statusMessage =
          "No phonebook entry with the given id was found";
        response
          .status(404)
          .send("No phonebook entry with the given id was found");
      }
    })
    .catch((error) => next(error));

  // const id = Number(request.params.id);
  // const person = persons.find((person) => person.id === id);

  // if (person) {
  //   response.json(person);
  // } else {
  //   response.statusMessage = "Phonebook entry with given id not found";
  //   response.status(404).send("No phonebook entry with the given id was found");
  // }
});

// deletes a single phonebook entry
app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// const generateId = () => {
//   const maxId = 1000000; // Set a maximum value for the ID
//   const minId = 1; // Set a minimum value for the ID
//   const randomId = Math.floor(Math.random() * maxId) + minId; // Generate a random integer between minId and maxId
//   return randomId;
// };

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

// const checkDuplicates = (newName) => {
//   const names = persons.map((person) => person.name);
//   return names.some((name) => name === newName);
// };

// create and save a new phonebook entry to the database
app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name and number must be added",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });

  // If the received data is missing a value for the name or the number property, the server will respond to the request with the status code 400 bad request
  // if (!body.name || !body.number) {
  //   return response.status(400).json({
  //     error: "name and number must be added",
  //   });
  // } else if (checkDuplicates(body.name)) {
  //   return response.status(400).json({
  //     error: "name must be unique",
  //   });
  // }

  // const person = {
  //   id: generateId(),
  //   name: body.name,
  //   number: body.number,
  // };

  // persons = persons.concat(person);
  // response.json(person);
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
