const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    username: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      require: true,
      enum: ['customer', 'vendor', 'shipper'],
    },
    hash: {
      type: String,
      require: true,
    },
    salt: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
