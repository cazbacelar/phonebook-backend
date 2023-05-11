# Phonebook backend
This is the backend part of the phonebook app project of the Full Stack Open course. The fullstack application was deployed using fly.io and it is available here: https://ancient-bird-6685.fly.dev/

<img width="600" src="https://github.com/cazbacelar/fullstackopen/blob/main/part2/media/phonebook.gif">

## Table of contents
- [Front-end - React application](https://github.com/cazbacelar/fullstackopen/tree/main/part2/phonebook)

This is a Node.js server that uses Express.js framework to serve a simple API for a phonebook application. The API include endpoints to create, read, update, and delete phonebook entries.

The server performs various operations to interact with a MongoDB database. It utilizes the Mongoose ODM library to connect to the database and handle data interactions. In addition, it employs several middleware functions from Express.js to facilitate its functionality. The cors middleware enables cross-origin resource sharing by setting the Access-Control-Allow-Origin header, while the morgan middleware logs HTTP requests to the console. The server defines GET and POST HTTP methods to manipulate phonebook entries and provides two middleware functions to handle errors effectively. Additionally, it also defines a custom morgan token that logs the request body for POST requests.
