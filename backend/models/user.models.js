const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  date: {
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model("User", UserSchema);
module.exports.User = User;