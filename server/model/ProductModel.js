// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Do Tung Lam 
//         Hoang Nguyen Nhat Minh
//         Loi Gia Long 
//         Ngo Ngoc Thinh
//         Vu Tuan Linh
// ID:     Do Tung Lam (s3963286)
//         Hoang Nguyen Nhat Minh (s3977856)
//         Loi Gia Long (s3758273)
//         Ngo Ngoc Thinh (s3879364)
//         Vu Tuan Linh (s3927502)
// Acknowledgement: 
// Bootstrap documentation: https://getbootstrap.com/ 
// Bootstrap icon: https://icons.getbootstrap.com/
// Google icon: https://fonts.google.com/icons
// Pexels: https://www.pexels.com/
// Canva: https://www.canva.com/

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
      minLength: [10, "Product's name must greater than or equal 10 characters"],
      maxLength: [20, "Product's name must less than or equal 20 characters"],
      require: true,
    },
    slug: { type: String, slug: 'name', unique: true },
    quantity: {
      type: Number,
      min: [0, "Product's quantity must be a non negative integer"],
      required: true,
      validate: {
        validator: (value) => {
          return Number.isInteger(value);
        },
        message: "Product's quantity must be a non negative integer",
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
      minLength: [1, "Product's description must be at least 1 characters"],
      maxLength: [500, "Product's description must be at least at most 500 characters"],
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
