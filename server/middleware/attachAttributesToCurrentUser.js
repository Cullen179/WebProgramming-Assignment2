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

const Customer = require('../model/CustomerModel.js');
const Shipper = require('../model/ShipperModel.js');
const Vendor = require('../model/VendorModel.js');

/**
 * Attach specific attributes of each role to req object
 * Ex: with customer => req.customer.picture,...
 * Ex: with vendor => req.vendor.businessName,...
 * Ex: with shipper => req.shipper.picture,...
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function attachAttributesToCurrentUserMiddelWare(req, res, next) {
  const user = req.user;

  if (user.role === 'customer') {
    Customer.findOne({ account: user._id })
      .then((customer) => {
        req.customer = {};
        req.customer._id = customer._id;
        req.customer.name = customer.name;
        req.customer.picture = customer.picture;
        req.customer.address = customer.address;

        next();
      })
      .catch((err) => {
        next(err);
      });
  }

  if (user.role === 'vendor') {
    Vendor.findOne({ account: user._id })
      .then((vendor) => {
        req.vendor = {};
        req.vendor._id = vendor._id;
        req.vendor.picture = vendor.picture;
        req.vendor.businessName = vendor.businessName;
        req.vendor.businessAddress = vendor.businessAddress;
        next();
      })
      .catch((err) => {
        next(err);
      });
  }

  if (user.role === 'shipper') {
    Shipper.findOne({ account: user._id })
      .then((shipper) => {
        req.shipper = {};
        req.shipper._id = shipper._id;
        req.shipper.name = shipper.name;
        req.shipper.picture = shipper.picture;
        req.shipper.hub = shipper.hub;

        next();
      })
      .catch((err) => next(err));
  }
}

module.exports = attachAttributesToCurrentUserMiddelWare;
