const mongoose = require("mongoose");

const User2Schema = mongoose.Schema({
  fname: {
    type: String,
    required: false
  },
  lname: {
    type: String,
    required: false
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("user2", User2Schema);