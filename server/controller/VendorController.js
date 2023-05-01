const mongoose = require('mongoose');
const User = require('../model/UserModel');
const Vendor = require('../model/VendorModel');
const generatePassword = require('../../utils/passwordUtils').generatePassword;
const siteService = require('../service/render');

class VendorController {
  // [GET] "/vendor/profile"
  showProfile(req, res, next) {
    res.render('vendor/vendor-profile', { vendor: req.vendor });
  }

  // [GET] "/vendor/register"
  showRegistration(req, res, next) {
    res.render('vendor/vendor-register');
  }

  // [POST] "/vendor/register"
  createAccount(req, res, next) {
    // Generate salt + hash
    const username = req.body.username;
    const password = req.body.password;
    const { salt, hash } = generatePassword(password);

    // Create user first
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      username: username,
      role: 'vendor',
      hash: hash,
      salt: salt,
    });

    // Save user
    user
      .save()
      .then(() => {
        // Create vendor
        const vendor = new Vendor({
          account: user._id,
          picture: 'vendor image link',
          businessName: req.body.businessname,
          businessAddress: req.body.businessaddress,
        });

        // Save vendor
        vendor
          .save()
          .then(() => {
            siteService.login(req, res, next);
          })
          .catch((err) => {
            next(err);
          });
      })
      .catch((err) => {
        // if err.code === 11000 => Handle duplicate username
        next(err);
      });
  }

  // [GET] "/vendor/addnewproduct"
  showAddNewProduct(req, res, next) {
    res.render('vendor/vendor-add-new-product');
  }
}

module.exports = new VendorController();
