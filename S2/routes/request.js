const express = require('express');
const { userCookieAuth } = require('../middlewares/auth');
const { ConnectionRequest } = require('../models/connectionRequest');
const User = require('../models/user');

const requestRoute = express.Router();
requestRoute.post('/request/send/:status/:toUserId', userCookieAuth, async (req, res) => {
  try {
    const connection = new ConnectionRequest({
      fromUserId: req.user,
      toUserId: req.params.toUserId,
      status: req.params.status,
    });
    const statusAllowed = ['ignore', 'interested'];
    const isStatusAllowed = statusAllowed.includes(req.params.status);
    if (!isStatusAllowed) {
      throw new Error('invalid status');
    }

    const isUserId = await User.findOne({ _id: req.params.toUserId });
    if (!isUserId) {
      throw new Error('User is not present');
    }

    await connection.save();
    res.send('Connection successfully sent');
  } catch (err) {
    res.send(err.message);
  }
});
module.exports = { requestRoute };
