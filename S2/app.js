const express = require('express');
const app = express();
app.listen(3000);

app.use('/test', (req, res) => {
  res.send('hello');
});
app.use('/', (req, res) => {
  res.send('testing');
});
