const express = require('express');
const { userCookieAuth } = require('../middlewares/auth');
const { ConnectionRequest } = require('../models/connectionRequest');
const User = require('../models/user');

const requestRoute = express.Router();
requestRoute.post('/request/send/:status/:toUserId', userCookieAuth, async (req, res) => {
  try {
    const statusAllowed = ['ignore', 'interested'];
    const isStatusAllowed = statusAllowed.includes(req.params.status);
    if (!isStatusAllowed) {
      throw new Error('invalid status');
    }

    const isUserId = await User.findOne({ _id: req.params.toUserId });
    if (!isUserId) {
      throw new Error('User is not present');
    }
    const isConnectionExist = await ConnectionRequest.findOne({
      $or: [
        { fromUserId: req.user._id, toUserId: req.params.toUserId },
        { fromUserId: req.params.toUserId, toUserId: req.user._id },
      ],
    });
    if (isConnectionExist) {
      throw new Error('Connection already exist');
    }
    const connection = new ConnectionRequest({
      fromUserId: req.user._id,
      toUserId: req.params.toUserId,
      status: req.params.status,
    });
    await connection.save();
    if (req.params.status === 'ignore') {
      res.send(`${req.user.firstName} ignored ${isUserId.firstName}`);
    } else {
      res.send(
        `${req.user.firstName} sent the connection request to  ${isUserId.firstName} successfully`
      );
    }
  } catch (err) {
    res.send('request.js:' + err.message);
  }
});
module.exports = { requestRoute };
