const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = model('User', userSchema);
