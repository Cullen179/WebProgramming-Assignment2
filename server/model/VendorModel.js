const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vendorSchema = new Schema(
  {
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    picture: {
      // data: Buffer,
      contentType: String,
    },
    businessName: {
      type: String,
      require: true,
      unique: true,
    },
    businessAddress: {
      type: String,
      require: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;
