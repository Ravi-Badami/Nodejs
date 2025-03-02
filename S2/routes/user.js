const express = require('express');
const userRoute = express.Router();

const { userCookieAuth } = require('../middlewares/auth');
const { ConnectionRequest } = require('../models/connectionRequest');
userRoute.get('/user/requests/received', userCookieAuth, async (req, res) => {
  try {
    const connectionList = await ConnectionRequest.find({
      toUserId: req.user._id,
      status: 'interested',
    }).populate('fromUserId', 'firstName gender photoUrl ');
    res.json({ message: 'Connections are', data: connectionList });
  } catch (error) {
    res.send('error occured' + error.message);
  }
});

module.exports = { userRoute };
