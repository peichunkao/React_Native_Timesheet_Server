const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true
  }
});

mongoose.model("Task", taskSchema);
