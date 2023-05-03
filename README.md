# Phonebook backend

This is the backend part of the phonebook app project of the Full Stack Open course. 

This is a Node.js application that creates a simple RESTful API for a phonebook. It uses Express.js, a popular Node.js web application framework, to handle HTTP requests and responses.

The application provides several HTTP endpoints to manipulate the list of phonebook entries:

- GET /api/persons returns all phonebook entries as JSON
- GET /api/persons/:id returns a single phonebook entry as JSON based on the id parameter in the request URL
- POST /api/persons adds a new phonebook entry and returns the added entry as JSON
- DELETE /api/persons/:id deletes a single phonebook entry based on the id parameter in the request URL and returns HTTP status code 204
- GET /info returns information about the number of entries in the phonebook and the current date and time

The application also defines a middleware function to log incoming HTTP requests and the response time using the [morgan](https://github.com/expressjs/morgan) middleware library.

In addition, it uses the [cors](https://github.com/expressjs/cors) middleware library to allow cross-origin resource sharing, which enables the API to be accessed by client applications running on different domains, such as the frontend.
