const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');

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
    slug: { type: String, slug: 'name', unique: true },
    quantity: {
      type: Number,
      min: [0, "Product's quantity must be a non negative an integer"],
      required: true,
      validate: {
        validator: (value) => {
          return Number.isInteger(value);
        },
        message: "Product's quantity must be a non negative an integer",
      },
    },
    price: {
      type: Number,
      min: [0.0001, "Product's price must be a positive number"],
      require: true,
      validate: {
        validator: (value) => {
          return isNumber(value);
        },
        message: "Product's price must be a positive number",
      },
    },
    picture: {
      data: Buffer,
      contentType: String,
    },
    description: {
      type: String,
      maxLength: [500, "Product's description must at most 500 characters"],
      require: true,
    },
  },
  { timestamps: true }
);

function isNumber(value) {
  return typeof value === 'number' && isFinite(value);
}

// Plugins
mongoose.plugin(slug);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
