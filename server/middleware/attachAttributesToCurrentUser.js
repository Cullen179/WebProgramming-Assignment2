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
        req.customer.adddress = customer.address;

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
        console.log(req.shipper);
        next();
      })
      .catch((err) => next(err));
  }
}

module.exports = attachAttributesToCurrentUserMiddelWare;
