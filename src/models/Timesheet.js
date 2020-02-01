const mongoose = require("mongoose");

const timesheetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  title: {
    type: String,
    unique: true,
    required: true
  },
  notes: {
    type: String,
    required: false
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  attachments: { type: Array, default: [], required: false }
});

mongoose.model("Timesheet", timesheetSchema);
