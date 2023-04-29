const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hubSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    address: {
      type: String,
      require: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Hub = mongoose.model('Hub', hubSchema);

module.exports = Hub;
