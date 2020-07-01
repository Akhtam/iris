const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Chatroom = require('../../models/Chatroom');
const validateChatroom = require('../../validation/chatroomValidation');

const User = require('../../models/User');

router.get('/', async (req, res) => {
  try {
    const chatrooms = await Chatroom.find();
    console.log(chatrooms);
    res.json(chatrooms);
  } catch (err) {
    res.json(err);
  }
});

router.post(
  '/',
  //   passport.authenticate('jwt', { session: false }), add later
  async (req, res) => {
    const { name, description, photoUrl = '', _admin } = req.body;
    try {
      const newChatroom = new Chatroom({ name, description, photoUrl, _admin });
      await newChatroom.save();
      await User.findOneAndUpdate(_admin, {
        $push: {
          createdChatrooms: newChatroom._id,
        },
      });
      res.json(newChatroom);
    } catch (err) {
      res.json(err);
    }
  }
);
module.exports = router;
