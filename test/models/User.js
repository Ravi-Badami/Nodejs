const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
});

// const user = mongoose.model('User', UserSchema);
// module.exports = { user };
module.exports = mongoose.model('User', userSchema);
