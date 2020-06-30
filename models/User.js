const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  currStatus: {
    type: Boolean,
    default: false,
  },
  about: {
    type: String,
    required: false,
  },
  createdChatrooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chatroom',
    },
  ],
  chatrooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chatroom',
    },
  ],
});

module.exports = User = mongoose.model('User', userSchema);
