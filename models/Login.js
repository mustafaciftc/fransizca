const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Enter mail address"],
  },
  password: {
    type: String,
    required: [true, "Enter password"],
  },
});
module.exports = mongoose.model("Login", loginSchema);
