const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shipperSchema = new Schema(
  {
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true
    },
    picture: {
      data: Buffer,
      contentType: String,
    },
    hub: {
      type: Schema.Types.ObjectId,
      ref: 'Hub',
      require: true
    },
  },
  { timestamps: true }
);

const Shipper = mongoose.model('Shipper', shipperSchema);

module.exports = Shipper;
