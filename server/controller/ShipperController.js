const mongoose = require('mongoose');
const User = require('../model/UserModel');
const Shipper = require('../model/ShipperModel');
const Hub = require('../model/HubModel');
const generatePassword = require('../../utils/passwordUtils').generatePassword;
const siteService = require('../service/render');
const {
  getImgSrc,
  getPictureObject,
} = require('../../utils/imgTransformation');

class ShipperController {
  // [GET] "/shipper/profile"
  showProfile(req, res, next) {
    res.render('shipper/shipper-profile');
  }

  // [GET] "/shipper/register"
  showRegistration(req, res, next) {
    let users = null;
    let hubs = null;

    let getData = async () => {
      await User.find()
        .then(data => {
            users = data;
          }
        ).catch(err => console.log(err));
        
      await Hub.find()
          .then(data => {
            hubs = data;
          }
          ).catch(err => console.log(err));
    };
    getData()
      .then(() => {
        res.render('shipper/shipper-register', { users, hubs });
      })
      .catch(err => console.log(err));
  }

  // [POST] "/shipper/register"
  createAccount(req, res, next) {
    // Generate salt + hash
    const username = req.body.username;
    const password = req.body.password;
    const { salt, hash } = generatePassword(password);
    const picture = getPictureObject(req, res, next);
    const hub = req.body.hub;

    // Create user first
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      username: username,
      role: 'shipper',
      hash: hash,
      salt: salt,
    });
    console.log(user);

    // Save user
    user
      .save()
      .then(() => {
        // Create shipper
        const shipper = new Shipper({
          account: user._id,
          picture: picture,
          hub: hub,
        });
        console.log(shipper)
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
