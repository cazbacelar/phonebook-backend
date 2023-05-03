const mongoose = require("mongoose");

// process.argv = [node, mongo.js, password]
// check if
if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
} else if (process.argv.length === 4 || process.argv.length > 5) {
  console.log("Usage: node mongo.js password name number");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb://phonebook:${password}@ac-mgmyoqg-shard-00-00.yqo71tr.mongodb.net:27017,ac-mgmyoqg-shard-00-01.yqo71tr.mongodb.net:27017,ac-mgmyoqg-shard-00-02.yqo71tr.mongodb.net:27017/phonebookApp?ssl=true&replicaSet=atlas-1tzutg-shard-0&authSource=admin&retryWrites=true&w=majority`;

// establish the connection to the database
mongoose.set("strictQuery", false);
mongoose.connect(url);

// define the schema of an person that is stored in the personSchema variable
// the schema tells Mongoose how the person objects are to be stored in the database
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  // app prints all the entries stored in the database
  Person.find({}).then((result) => {
    // since the parameter of find is an empty object, we get all of the entries stored in the people collection
    result.forEach((person) => {
      console.log(`${person.name} - ${person.number}`);
    });
    mongoose.connection.close();
  });
} else {
  // create a new person object with the help of the Person model
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  // save the object to the database
  // the result of the save operation is in the result parameter of the event handler
  person.save().then((result) => {
    console.log(
      `Added ${process.argv[3]} (${process.argv[4]}) to the phonebook`
    );
    mongoose.connection.close();
  });
}
