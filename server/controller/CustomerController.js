const mongoose = require('mongoose');
const User = require('../model/UserModel');
const Customer = require('../model/CustomerModel');
const generatePassword = require('../../utils/passwordUtils').generatePassword;
const siteService = require('../service/render');

class CustomerController {
  // [GET] "/customer/:id"
  getCustomer(req, res, next) {
    // Handle logic get customer by ID
  }

  // [GET] "/customer/register"
  showRegistration(req, res, next) {
    res.render('customer-register');
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

    // Save user
    user
      .save()
      .then(() => {
        // Create customer
        const customer = new Customer({
          account: user._id,
          picture: 'customer image link',
          name: 'customer name',
          address: 'vn',
        });

        // Save customer
        customer
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
}

module.exports = new CustomerController();