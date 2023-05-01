const mongoose = require('mongoose');
const User = require('../model/UserModel');
const Vendor = require('../model/VendorModel');
const Product = require('../model/ProductModel');
const generatePassword = require('../../utils/passwordUtils').generatePassword;
const siteService = require('../service/render');

class VendorController {
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

  // [GET] "/vendor/profile"
  showProfile(req, res, next) {
    res.render('vendor/vendor-profile', { vendor: req.vendor });
  }

  // [GET] "/vendor/profile/edit"
  showEditProfile(req, res, next) {
    res.render('vendor/vendor-profile-edit');
  }

  // [POST] "vendor/profile/edit"
  editProfile(req, res, next) {
    const curVendor = req.vendor;
    const businessName = req.businessname;
    const businessAddress = req.businessaddress;
    // const picture = '';

    Vendor.findOne({ _id: curVendor._id })
      .then((vendor) => {
        // Can not find the vendor inside database
        // Nearly not happen
        if (!vendor) {
          return;
        }
        
        // Update vendor in database
        vendor.businessName =   businessName;
        vendor.businessAddress = businessAddress;
        // vendor.picture = picture;

        vendor
          .save()
          .then(() => {
            // After save done go back to home
            res.redirect('/');
          })
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  }

  // [GET] "/vendor/addnewproduct"
  showAddNewProduct(req, res, next) {
    res.render('vendor/vendor-add-new-product');
  }

  // [POST] "/vendor/addnewproduct"
  addNewProduct(req, res, next) {
    const curVendor = req.vendor;
    const productName = req.body.productname;
    const productPrice = req.body.productprice;
    const productDescription = req.body.productdescription;
    const productQuantity = req.body.productquantity;
    // const productImage = req.body.productimage;

    // Create and save product
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      ownership: curVendor._id,
      name: productName,
      price: productPrice,
      quantity: productQuantity,
      description: productDescription,
      // image: "",
    });

    product
      .save()
      .then(() => {
        // After save go back home
        res.redirect('/');
      })
      .catch((err) => next(err));
  }
}

module.exports = new VendorController();
