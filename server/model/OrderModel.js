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
    price: {
      type: Number,
      require: true
    },
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