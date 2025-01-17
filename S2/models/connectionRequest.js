const mongoose = require('mongoose');

const connectRequestSchema = new mongoose.Schema(
  {
    fromUserId: { type: mongoose.Schema.Types.ObjectId, required: true },
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

const ConnectionRequest = new mongoose.model('connectionRequest', connectRequestSchema);

connectRequestSchema.pre;

module.exports = { ConnectionRequest };
