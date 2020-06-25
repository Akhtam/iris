const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./config/keys.js').mongoURI;
const mongoose = require('mongoose');

const users = require('./routes/api/users');

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
