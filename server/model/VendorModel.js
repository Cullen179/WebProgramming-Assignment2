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

const vendorSchema = new Schema(
  {
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    picture: {
      data: Buffer,
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
