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
    if (req.user.role === 'customer') {
      Product.find()
        .then(products => {
          products.forEach(product => {
            if (product.picture) {
              product.imgSrc = getImgSrc(product.picture);
            }
          })
          res.render('customer/customer-home', { products: products });
      })
      .catch(err => {
        next(err);
      });
    }

    if (req.user.role === 'vendor') {
      Product.find()
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
    res.render('login', {loginError: req.flash('error')});
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
}

module.exports = new SiteService();
