const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const secretOrKey = require('../../config/keys').secretOrKey;
const User = require('../../models/User');
const validateUserAuth = require('../../validation/authValidation');

//Get current User
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  ({ user: { id, username } }, res) => {
    res.json({ id, username });
  }
);

//Register User
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const { errors, isValid } = validateUserAuth(username, password, 'register');
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const user = await User.findOne({ username });
  if (user) return res.status(400).json({ msg: 'Username already taken!' });
  const newUser = new User({ username, password });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, async (err, hash) => {
      if (err) throw err;
      try {
        newUser.password = hash;
        const hashedUser = await newUser.save();
        const payload = { id: hashedUser._id, username: hashedUser.username };
        jwt.sign(payload, secretOrKey, { expiresIn: 3600 }, (err, token) => {
          res.json({ success: true, token: 'Bearer ' + token });
        });
      } catch (error) {
        console.log(error);
      }
    });
  });
});

//Login User
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const { errors, isValid } = validateUserAuth(username, password, 'login');
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const user = await User.findOne({ username });
  if (!user) {
    errors.username = 'Username does not exist';
    return res.status(400).json(errors);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    const payload = { id: user._id, username: user.username };
    jwt.sign(payload, secretOrKey, { expiresIn: 3600 }, (err, token) => {
      res.json({ success: true, token: 'Bearer ' + token });
    });
  } else {
    errors.password = 'Incorrect password';
    res.status(400).json(errors);
  }
});

module.exports = router;
