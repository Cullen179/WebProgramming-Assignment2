const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    picture: {
      data: Buffer,
      contentType: String,
    },
    name: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
