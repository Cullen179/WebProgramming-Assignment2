const mongoose = require('mongoose');
const User = require('../model/UserModel');
const Customer = require('../model/CustomerModel');
const generatePassword = require('../../utils/passwordUtils').generatePassword;
const siteService = require('../service/render');

class CustomerController {
  // [GET] "/customer/profile"
  showProfile(req, res, next) {
    res.render('customer/customer-profile');
  }

  // [GET] "/customer/register"
  showRegistration(req, res, next) {
    res.render('customer/customer-register');
  }

  // [POST] "/customer"
  createAccount(req, res, next) {
    // Generate salt + hash
    const username = req.body.username;
    const password = req.body.password;
    const { salt, hash } = generatePassword(password);

    // Create user first
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      username: username,
      role: 'customer',
      hash: hash,
      salt: salt,
    });

    console.log(user);
    // Save user
    user
      .save()
      .then(() => {
        // Create customer
        const customer = new Customer({
          account: user._id,
          picture: 'customer image link',
          name: 'test name',
          address: 'vn',
        });

        // Save customer
        customer
          .save()
          .then(() => {
            siteService.login(req, res, next);
            console.log('create success');
          })
          .catch((err) => {
            // next(err);
            console.log(err);
          });
      })
      .catch((err) => {
        // if err.code === 11000 => Handle duplicate username
        next(err);
      });
  }
}

module.exports = new CustomerController();
