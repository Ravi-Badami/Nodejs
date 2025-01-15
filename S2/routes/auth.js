const express = require('express');

const authRoute = express.Router();
const { validateFormData } = require('../utils/validation');
const bcrypt = require('bcrypt');
const User = require('../models/user');

authRoute.post('/login', async (req, res) => {
  try {
    // validateFormData(req);

    const { emailId, password } = req.body;
    const DbEmail = await User.findOne({ emailId: emailId });
    if (!DbEmail) {
      throw new Error('Invalid credentials');
    }
    const isPasswordSame = await DbEmail.validatePassword(password);
    if (isPasswordSame) {
      const token = await DbEmail.getJWT();
      res.cookie('token', token);
      res.send('password correct logged in');
    } else {
      res.send('password is wrong');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});
authRoute.post('/signup', async (req, res) => {
  const { firstName, emailId, password, gender } = req.body;

  try {
    validateFormData(req);
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      emailId,
      password: passwordHash,
      gender,
    });
    
    // Save the user to the database
    await user.save();
    res.send('Inserted successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});
module.exports = { authRoute };
