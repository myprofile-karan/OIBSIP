const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
  },
  token: {
    type: String,
    default: null,
  },
});

const User = mongoose.models.users || mongoose.model("User", userSchema);
module.exports = User;
