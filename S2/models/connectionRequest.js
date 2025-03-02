const mongoose = require('mongoose');

const connectRequestSchema = new mongoose.Schema(
  {
    fromUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    toUserId: { type: mongoose.Schema.Types.ObjectId, required: true },
    status: {
      type: String,
      enum: {
        values: ['ignore', 'interested', 'accepted', 'rejected'],
        message: `{VALUE} is not valid`,
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
// .
connectRequestSchema.pre('save', function (next) {
  try {
    if (this.fromUserId.equals(this.toUserId)) {
      throw new Error('You cannot send connection request to yourself');
    }
    next();
  } catch (err) {
    throw new Error(err.message);
  }
});

const ConnectionRequest = new mongoose.model('connectionRequest', connectRequestSchema);

module.exports = { ConnectionRequest };
