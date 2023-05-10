const mongoose = require('mongoose');
const User = require('../model/UserModel');
const Customer = require('../model/CustomerModel');
const generatePassword = require('../../utils/passwordUtils').generatePassword;
const siteService = require('../service/render');
const {
  getImgSrc,
  getPictureObject,
} = require('../../utils/imgTransformation');

class CustomerController {
  // [GET] "/customer/profile"
  showProfile(req, res, next) {
    res.render('customer/customer-profile');
  }

  // [GET] "/customer/register"
  showRegistration(req, res, next) {
    let users = null;
    let customers = null;

    let getData = async () => {
      await User.find()
        .then(data => {
            users = data;
          }
        ).catch(err => console.log(err));
    };
    getData()
      .then(() => {
        res.render('customer/customer-register', {users});
      })
      .catch(err => console.log(err));

  }

  // [POST] "/customer"
  createAccount(req, res, next) {
    // Generate salt + hash
    const username = req.body.username;
    const password = req.body.password;
    const pictureObject = getPictureObject(req, res, next);
    const name = req.body.name;
    const address = req.body.address;
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
          picture: pictureObject,
          name: name,
          address: address,
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
