const express = require('express');
const app = express();
const { connectDB } = require('./connection');
const User = require('./models/User');

app.get('/', (req, res) => {
  res.send('where is your presence of mind');
});
app.post('/user', async (req, res) => {
  try {
    const userData = new User({
      firstName: 'ravi',
      lastName: 'badami',
    });
    await userData.save();
    res.send('data saved');
  } catch (err) {
    res.send(err.message);
  }
});

connectDB()
  .then(() => {
    console.log('connected');
    app.listen(3001, () => {
      console.log('listening to the server 3001');
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
