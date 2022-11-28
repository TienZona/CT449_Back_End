const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: { type: String, default: null },
  birthdate: { type: String, default: null },
  sex: { type: String, default: null },
  role: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
});

module.exports = mongoose.model("user", userSchema);