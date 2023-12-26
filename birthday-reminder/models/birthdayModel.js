// models/birthdayModel.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const birthdaySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Birthday', birthdaySchema);
