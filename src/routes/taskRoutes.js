const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");
const Task = mongoose.model("Task");

const router = express.Router();

router.use(requireAuth);

router.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
});

router.post("/tasks", async (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res
      .status(422)
      .send({ error: "You must provide a task." });
  }
  try {
    const taskItem = new Task({ task });
    await taskItem.save();
    res.send(taskItem);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.delete("/tasks/:_id", async (req, res) => {
  const _id = req.params._id;

  Task.deleteOne({ _id }, function (err) {
    if (err) {
      res.status(400).json({ error: "delete data error" });
      console.log("err");
    } else {
      res.status(201).json({ success: "true" });
    }
  });
});

module.exports = router;
