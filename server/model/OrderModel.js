const { Schema, default: mongoose } = require("mongoose");

const orderSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      require: true
    },
    product: [{
      type: Schema.Types.ObjectId,
      ref: 'Product',
      require: true
    }],
    hub: {
      type: Schema.Types.ObjectId,
      ref: 'Hub',
      require: true
    },
    status: {
      type: String,
      enum: ['active', 'delivered', 'canceled'],
      require: true
    }
  },
  {timestamps: true}
)

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;