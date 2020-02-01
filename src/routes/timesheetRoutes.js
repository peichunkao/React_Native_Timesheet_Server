const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");
const Timesheet = mongoose.model("Timesheet");
// const Timesheet = require("../models/Timesheet");

const router = express.Router();

router.use(requireAuth);

router.get("/timesheets", async (req, res) => {
  const timesheets = await Timesheet.find({ userId: req.user._id });
  // console.log("get");
  res.send(timesheets);
});

router.put("/timesheets/:_id", async (req, res) => {
  const { title, notes, startTime, endTime, attachments } = req.body;
  // const _id = req.params._id;
  var query = { _id: req.params._id };

  if (!title || !startTime || !endTime) {
    return res
      .status(422)
      .send({ error: "You must provide a title, startTime and endTime" });
  }

  const timesheet = {
    title,
    notes,
    startTime,
    endTime,
    attachments
  };
  Timesheet.update(query, timesheet, function(err) {
    if (err) {
      res.status(422).send({ error: err.message });
    } else {
      res.status(201).json({ success: "true" });
      // console.log("success");
    }
  });
});

router.post("/timesheets", async (req, res) => {
  const { title, notes, startTime, endTime, attachments } = req.body;

  if (!title || !startTime || !endTime) {
    return res
      .status(422)
      .send({ error: "You must provide a title, startTime and endTime" });
  }

  try {
    const timesheet = new Timesheet({
      title,
      notes,
      startTime,
      endTime,
      attachments,
      userId: req.user._id
    });
    await timesheet.save();
    res.send(timesheet);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.delete("/timesheets/:_id", async (req, res) => {
  const _id = req.params._id;

  Timesheet.deleteOne({ _id }, function(err) {
    if (err) {
      res.status(400).json({ error: "delete data error" });
      console.log("err");
    } else {
      res.status(201).json({ success: "true" });
      // console.log("success");
    }
  });
});

module.exports = router;
