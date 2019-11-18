const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
// const mongoose = require('mongoose');
// const config = require('./DB.js');
const registrationRoutes = require('./route');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://cccjlwrite:<password>@cluster0-dtqee.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  if (err) console.log('Can not connect to the database'+ err);
  console.log('Database is connected')
  // perform actions on the collection object
  client.close();
});
// mongoose.Promise = global.Promise;
// mongoose.connect(config.DB, { useNewUrlParser: true }).then(
//   () => {console.log('Database is connected') },
//   err => { console.log('Can not connect to the database'+ err)}
// );

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/registration', registrationRoutes)
app.listen(PORT, function(){
  console.log('Server is running on Port:',PORT);
});
