const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    ownership: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor',
    },
    name: {
      type: String,
      minLength: [
        10,
        "Product's name must greater than or equal 10 characters",
      ],
      maxLength: [20, "Product's name must less than or equal 20 characters"],
      require: true,
    },
    quantity: {
      type: Number,
      min: [0, "Product's quantity must greater than zero"],
      required: true,
      validate: {
        validator: Number.isInteger,
        message: 'Product\'s quantity must be an integer',
      },
    },
    price: {
      type: Number,
      min: [0.0000001, "Product's price must be a positive number"],
      require: true,
    },
    picture: {
      // data: Buffer,
      // contentType: String,
      // require: true,
    },
    description: {
      type: String,
      maxLength: [500, "Product's description must at most 500 characters"],
      require: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
