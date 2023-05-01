const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shipperSchema = new Schema(
  {
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      require: true,
    },
    picture: {
      type: String,
      require: true,
    },
    hub: {
      type: String,
      require: true,
      enum: ['hub1', 'hub2', 'hub3'],
    },
  },
  { timestamps: true }
);

const Shipper = mongoose.model('Shipper', shipperSchema);

module.exports = Shipper;
