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
    let vendors = null;

    let getData = async () => {
      await User.find()
        .then((data) => {
          users = data;
        })
        .catch((err) => console.log(err));

      await Vendor.find()
        .then((data) => {
          vendors = data;
        })
        .catch((err) => console.log(err));
    };
    getData()
      .then(() => {
        res.render('vendor/vendor-register', { users, vendors });
      })
      .catch((err) => console.log(err));
  }

  // [POST] "/vendor/register"
  createAccount(req, res, next) {
    // Generate salt + hash
    const username = req.body.username;
    const password = req.body.password;
    const businessName = req.body.businessName;
    const businessAddress = req.body.businessAddress;
    const { salt, hash } = generatePassword(password);
    const pictureObject = getPictureObject(req, res, next);

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
          picture: pictureObject,
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
    // Attach imgSrc property to vendor
    // => View get product.imgSrc to put into image tag
    const user = req.user;
    const vendor = req.vendor;
    const imgSrc = getImgSrc(vendor.picture);
    if (imgSrc) {
      vendor.imgSrc = imgSrc;
    }
    res.render('vendor/vendor-profile', { user: user, vendor: vendor });
  }

  // [GET] "/vendor/profile/edit"
  showEditProfile(req, res, next) {
    // Attach imgSrc property to vendor
    // => View get product.imgSrc to put into image tag
    const user = req.user;
    const vendor = req.vendor;
    const imgSrc = getImgSrc(vendor.picture);
    if (imgSrc) {
      vendor.imgSrc = imgSrc;
    }
    res.render('vendor/vendor-edit-profile', { 
      user: user, 
      vendor: vendor,
      nameError: req.flash('nameError'),
      addressError: req.flash('addressError'), 
    });
  }

  // [PUT] "/vendor/profile/edit"
  editProfile(req, res, next) {
    const curVendor = req.vendor;
    const pictureObject = getPictureObject(req, res, next);

    // Check duplicate business name first
    Vendor.find({$or: [{businessName: req.body.businessname}, {businessAddress: req.body.businessaddress}], _id: { $ne: curVendor._id }})
      .then((vendor) => {

        // If exists vendor with the updated bussiness name => Reject updating
        if (vendor != null) {
          
          vendor.forEach((vendorProfile) => {
            console.log(vendorProfile.businessName)
            if (vendorProfile.businessName == req.body.businessname ) {
              req.flash('nameError', `Business name ${req.body.businessname} has already been used.`);
            }

            if (vendorProfile.businessAddress == req.body.businessaddress) {
              req.flash('addressError', `Business address ${req.body.businessaddress} has already been used.`);
            }
          })
          console.log(curVendor._id)
          res.redirect('/vendor/profile/edit');

        } else {
          updateVendorDetail();
        }
      })
      .catch((err) => next(err));

    // Update function after passing validations
    function updateVendorDetail() {
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
  }

  // [DELETE] "vendor/profile"
  deleteAccount(req, res, next) {
    // TODO: logout then Delete vendor + user account
  }
}

module.exports = new VendorController();
