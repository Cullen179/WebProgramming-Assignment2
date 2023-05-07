const mongoose = require('mongoose');
const User = require('../model/UserModel');
const Vendor = require('../model/VendorModel');
const Product = require('../model/ProductModel');
const generatePassword = require('../../utils/passwordUtils').generatePassword;
const siteService = require('../service/render');
const { getImgSrc, getPictureObject } = require('../../utils/imgTransformation');

class VendorController {
  // [GET] "/vendor/register"
  showRegistration(req, res, next) {
    let users = null;
    User.find()
      .then((data) => {
        users = data;
        console.log(users);
        res.render('vendor/vendor-register', { users: users });
      })
      .catch();
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
          businessName: req.body.businessName,
          businessAddress: req.body.businessAddress,
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

  // [GET] "/vendor/profile"
  showProfile(req, res, next) {
    res.render('vendor/vendor-profile', { vendor: req.vendor });
  }

  // [GET] "/vendor/profile/edit"
  showEditProfile(req, res, next) {
    const curVendor = req.vendor;

    Vendor.findOne({ _id: curVendor._id })
      .then((vendor) => {
        const imgSrc = getImgSrc(vendor.picture);
        if (imgSrc) {
          vendor.imgSrc = imgSrc;
        }

        res.render('vendor/vendor-edit-profile', { vendor: vendor });
      })
      .catch((err) => {
        next(err);
      });
  }

  // [GET] "/vendor/addnewproduct"
  showAddNewProduct(req, res, next) {
    res.render('vendor/add-product');
  }

  // [POST] "/vendor/addnewproduct"
  addNewProduct(req, res, next) {
    const curVendor = req.vendor;
    const pictureObject = getPictureObject(req, res, next);

    const vendorData = {
      businessName: req.body.businessname,
      businessAddress: req.body.businessaddress,
    };
    if (pictureObject) {
      vendorData.picture = pictureObject;
    }

    Vendor.updateOne({ _id: curVendor._id }, vendorData)
      .then(() => {
        res.redirect('/vendor/profile');
      })
      .catch((err) => next(err));
  }

  // [DELETE] "vendor/profile"
  deleteAccount(req, res, next) {
    // TODO: logout then Delete vendor + user account
  }
}

module.exports = new VendorController();
