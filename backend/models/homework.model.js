const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HomeworkSchema = new Schema({
  content: String,
  extra: String,
  dateDue: String,
  user: String,
  dateCreated: {
    type: Date,
    default: Date.now
  }
})

module.exports.Homework = mongoose.model("Homework", HomeworkSchema);