const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

//Register User
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) return res.status(400).json({ msg: 'Username already taken!' });
  const newUser = new User({ username, password });
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, async (err, hash) => {
      if (err) throw err;
      try {
        newUser.password = hash;
        const hashedUser = await newUser.save();
        return res.json(hashedUser);
      } catch (error) {
        console.log(error);
      }
    });
  });
});

//Login User
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ msg: 'Wrong credentials!' });
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) return res.json({ msg: 'Succes' });
  return res.status(400).json({ msg: 'Wrong credentials!' });
});

module.exports = router;
