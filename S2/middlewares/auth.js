const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

const adminAuth = (req, res, next) => {
  const token = 'xyz';
  const isAuthenticated = token === 'xyz';
  if (!isAuthenticated) {
    res.status(401).send('No admin rights');
  }
};
const userCookieAuth = async (req, res, next) => {
  try {
    const { token } = await req.cookies;
    if (!token) {
      throw new Error('token not found');
    }
    const userId = jwt.verify(token, 'blablabla');
    console.log(userId);
    const user = await User.findById(userId);
    console.log('this is the user id', User.findById({ id: '6782b05e914235a8fa061f7d' }));
    if (!user) {
      throw new Error('User not found');
    }
    req.user = user;

    next();
  } catch (errr) {
    res.send(errr.message);
  }
};

module.exports = { adminAuth, userCookieAuth };
