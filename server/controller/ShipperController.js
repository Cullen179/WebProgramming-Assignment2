const mongoose = require('mongoose');
const User = require('../model/UserModel');
const Shipper = require('../model/ShipperModel');
const generatePassword = require('../../utils/passwordUtils').generatePassword;
const siteService = require('../service/render');

class ShipperController {
  // [GET] "/shipper/profile"
  showProfile(req, res, next) {
    res.render('shipper/shipper-profile');
  }

  // [GET] "/shipper/register"
  showRegistration(req, res, next) {
    res.render('shipper/shipper-register');
  }

  // [POST] "/shipper/register"
  createAccount(req, res, next) {
    // Generate salt + hash
    const username = req.body.username;
    const password = req.body.password;
    const { salt, hash } = generatePassword(password);

    // Create user first
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      username: username,
      role: 'shipper',
      hash: hash,
      salt: salt,
    });

    // Save user
    user
      .save()
      .then(() => {
        // Create shipper
        const shipper = new Shipper({
          account: user._id,
          name: 'shipper name',
          picture: 'shipper image link',
          hub: 'hub1',
        });

        // Save shipper
        shipper
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

module.exports = new ShipperController();
