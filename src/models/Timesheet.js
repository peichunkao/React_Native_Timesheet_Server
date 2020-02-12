const mongoose = require("mongoose");

const timesheetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  task: {
    type: String,
    unique: false,
    required: true
  },
  notes: {
    type: String,
    required: false
  },
  images: { type: Array, default: [], required: false },
  status: {
    type: String,
    required: true
  },
  isTimeOff: {
    type: Boolean,
    required: false
  }
});

mongoose.model("Timesheet", timesheetSchema);
