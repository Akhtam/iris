const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Chatroom = require('../../models/Chatroom');
const validateChatroom = require('../../validation/chatroomValidation');

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
      const newChatroom = await new Chatroom({ name, description, photoUrl, _admin });
      await newChatroom.save();
      res.json(newChatroom);
    } catch (err) {
      res.json(err);
    }
  }
);
module.exports = router;
