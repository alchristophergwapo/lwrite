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

const uri = "mongodb://127.0.0.1/lwrite";
// const uri = "mongodb+srv://cccjlwrite:groupcccj@lwrite-dtqee.gcp.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri, {useUnifiedTopology: true,useNewUrlParser: true, useCreateIndex: true }
).then(()=>{
  console.log(`connection to database established`)
}).catch(err=>{
  console.log(`db error ${err.message}`);
  process.exit(-1)
})

const authenticate = require('./api/authentication');
const postRoute = require('./api/postRoute')
const profile = require('./api/profile')

app.use('/authenticate', authenticate)
app.use('/post', postRoute)
app.use('/account', profile)

app.use('/public', express.static('public'));

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

