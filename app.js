const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./config/keys.js').mongoURI;
const mongoose = require('mongoose');
const passport = require('passport');

const users = require('./routes/api/users');
const chatrooms = require('./routes/api/chatrooms');

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/chatrooms', chatrooms);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
