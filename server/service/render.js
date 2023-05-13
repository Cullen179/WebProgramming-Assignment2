const User = require('../model/UserModel');
const Product = require('../model/ProductModel');
const Hub = require('../model/HubModel');
const passport = require('passport');
const { getImgSrc } = require('../../utils/imgTransformation');

/**
 * SiteService acts like site controller, includes
 * all function handling general routes
 */
class SiteService {
  // [GET] "/"
  homeRoute(req, res, next) {
    let img = [];
    if (req.user.role === 'customer') {
      Product.find()
        .then((products) => {

          // Get only available product
          products.filter((product) => product.quantity > 0);

          // Attach imgSrc property to each product
          products.forEach((product) => {
            if (product.picture) {
              product.imgSrc = getImgSrc(product.picture);
              img.push(product.imgSrc);
            } else img.push('');
          });
          res.render('customer/customer-home', { products: products, customer: req.user , img: img, orderSuccess: req.flash('orderSuccess'), orderError: req.flash('orderError')});
        })
        .catch((err) => {
          next(err);
        });
    }

    if (req.user.role === 'vendor') {
      const curVendor = req.vendor;
      Product.find({ ownership: curVendor._id })
        .then((products) => {
          // Attach imgSrc property to each product
          // => View get product.imgSrc to put into image tag
          products.forEach((product) => {
            const imgSrc = getImgSrc(product.picture);
            if (imgSrc) {
              product.imgSrc = imgSrc;
            }
          });

          res.render('vendor/vendor-home', { products: products });
        })
        .catch((err) => {
          next(err);
        });
    }

    if (req.user.role === 'shipper') {
      res.render('shipper/shipper-home');
    }
  }
  // [POST] "/login"
  login(req, res, next) {
    passport.authenticate('local', {
      failureRedirect: '/login?error=1',
      failureFlash: 'Your username or password is incorrect. Please try again!',
      successRedirect: '/',
    })(req, res, next);
  }

  // [GET] "/login"
  showLogin(req, res, next) {
    res.render('login', { loginError: req.flash('error') });
  }

  // [GET] "/logout"
  logout(req, res, next) {
    req.logout(function (err) {
      // Delete session.passport.user
      if (err) {
        return next(err);
      }

      res.redirect('/login');
    });
  }

  // [GET] "/about-us"
  showAboutUs(req, res, next) {
    res.render('about-us')
  }
}

module.exports = new SiteService();
