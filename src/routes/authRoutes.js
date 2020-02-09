const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

const router = express.Router();

router.get('/users/:email', async (req, res) => {
  const _email = req.params.email; 
  let user = await User.find({ email: _email });
  // const userId = req.user._id
  // user = { ...user, userId }
  console.log("getUser:email")
  res.send(user);
});

router.get('/users/', async (req, res) => {
  let user = await User.find();
  res.send(user);
});

router.post('/signup', async (req, res) => {
  const { email, password, firstName, lastName, role } = req.body;

  try {
    const user = new User({ email, password, firstName, lastName, role });
    await user.save();
    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide email and password' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).send({ error: 'Invalid password or email' });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
    // const user = User.find({ email: email });
    res.send({ token, user });

  } catch (err) {
    return res.status(422).send({ error: 'Invalid password or email' });
  }
});



module.exports = router;
