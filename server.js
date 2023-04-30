//console.log("iam in express project")

const express = require('express');
const errorHandler = require('./middleware/errorhandler');
const connectDb = require('./config/dbConnection');
const dotenv = require('dotenv').config(); //Dotenv module allows you to load environment variables from a file named .env into the process.env object, which can then be used throughout your application. config method reads the .env file in the root directory of your project, parses the key-value pairs, and adds them to the process.env object.
connectDb();  //database connected
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); //provid a parser whihc will help us to parse the data stream that we receive from the client on the server side

app.use('/api/contacts', require('./routes/contactRoutes')); //act as middleware  it wiill fectch all the routes form routes folder and api/conatacts are the initial path to start
app.use(errorHandler);
app.listen(port, () => {
  //call back function - callback function is a function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of routine or action. it excute only after primary function execute
  console.log(`server running on port ${port} `);
});
