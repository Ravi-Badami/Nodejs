const express = require('express');
const { userCookieAuth } = require('../middlewares/auth');

const requestRoute = express.Router();
requestRoute.post('/sendConnectionRequest', userCookieAuth, (req, res) => {
  res.send('The request connectino is sent by ' + req.user.firstName);
});
module.exports = { requestRoute };
