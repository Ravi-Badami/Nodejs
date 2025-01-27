const express = require('express');

const profileRoute = express.Router();
const { userCookieAuth } = require('../middlewares/auth');
const { validateEditFormData } = require('../utils/validation');
const User = require('../models/user');

profileRoute.get('/profile', userCookieAuth, async (req, res) => {
  const user = req.user;
  console.log(user);
  // console.log(token);
  res.json({ message: 'user found', user: user });
});

profileRoute.patch('/user/:userId', async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    if (data.skills.length > 10) {
      throw new Error('Skills cannot be more then 10');
    }
    const UPDATE_ALLOWED = ['skills', 'gender', 'photoUrl', 'about'];
    const isAllowed = Object.keys(data).every((k) => UPDATE_ALLOWED.includes(k));

    if (!isAllowed) {
      throw new Error('Update not allowed');
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: 'after',
      runValidators: true,
    });
    res.send('updated successfully');
  } catch (error) {
    res.send('Cannot update' + error.message);
  }
});

profileRoute.get('/findUser', async (req, res) => {
  try {
    const users = await User.findOne({ emailId: req.body.emailId });
    console.log(users);
    if (users === null) {
      res.send('user not found');
    } else {
      res.send(users);
    }
  } catch (error) {
    res.send(error.message);
  }
});
profileRoute.delete('/deleteUser', async (req, res) => {
  const userId = req.body.userId;
  try {
    const users = await User.findByIdAndDelete(userId);
    console.log(users);
    res.send('user deleted successfully');
  } catch (error) {
    res.send(error.message);
  }
});

profileRoute.patch('/profile/edit', userCookieAuth, async (req, res) => {
  try {
    validateEditFormData(req);
    if (!validateEditFormData) throw new Error('Invalid data');
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.send(`${loggedInUser.firstName} ,you profile data is updated successfully`);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = { profileRoute };
