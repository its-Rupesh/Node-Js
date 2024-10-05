const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  First_Name: {
    type: String,
    required: true,
  },
  Last_Name: {
    type: String,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Jobtitle: {
    type: String,
  },
  Gender: {
    type: String,
  },
});

const users = mongoose.model("user", userSchema);

module.exports = users;
