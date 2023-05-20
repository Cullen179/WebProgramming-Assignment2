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

const User = require('../model/UserModel');
const Shipper = require('../model/ShipperModel');
const Customer = require('../model/CustomerModel');
const Vendor = require('../model/VendorModel');

exports.login = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const account = User.findOne({ username: username, password: password });
  const shipper = Shipper.findOne({ account: account._id });
  account
    .then((accountData) => {
      if (accountData) {
        console.log('log in success');
        // res.redirect(getUserPage(accountData));
      } else {
        console.log('log in fail');
      }
    })
    .catch((err) => console.log(err));
};

function getUserPage(account) {
  if (account.role === 'shipper') {
    Shipper.findOne({ account: account._id })
      .then((data) => {
        // console.log('/shipper?id=' + data._id)
        return '/shipper?id=' + data._id;
      })
      .catch((err) => console.log(err));
  } else if (account.role === 'customer') {
    Customer.findOne({ account: account._id })
      .then((data) => {
        return '/customer?id=' + data._id;
      })
      .catch((err) => console.log(err));
  } else if (account.role === 'vendor') {
    Vendor.findOne({ account: account._id })
      .then((data) => {
        return '/vendor?id=' + data._id;
      })
      .catch((err) => console.log(err));
  } else {
    console.log('role not found');
    return '/';
  }
}
