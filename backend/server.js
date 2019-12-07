const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// Parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
       next();
});

const uri = "mongodb://127.0.0.1/lwrite";
mongoose.connect(uri, {useUnifiedTopology: true,useNewUrlParser: true, useCreateIndex: true }
).then(()=>{
  console.log(`connection to database established`)
}).catch(err=>{
  console.log(`db error ${err.message}`);
  process.exit(-1)
})

const routes = require('./api/route');
const postRoute = require('./api/postRoute')
const profile = require('./api/profileImageRoute')

app.use('/to', routes)
app.use('/addPost', postRoute)
app.use('/profile', profile)

app.use('/public', express.static('public'));

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

