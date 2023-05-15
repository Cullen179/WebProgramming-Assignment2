const User = require('../model/UserModel');
const Shipper = require('../model/ShipperModel');
const Customer = require('../model/CustomerModel');
const Product = require('../model/ProductModel')
const Hub = require('../model/HubModel');
const Order = require('../model/OrderModel');
const passport = require('passport');
const { getImgSrc } = require('../../utils/imgTransformation');

/**
 * SiteService acts like site controller, includes
 * all function handling general routes
 */
class SiteService {
  // [GET] "/"
  homeRoute(req, res, next) {
    let minPrice = 0, maxPrice = 999999;
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
          res.render('customer/customer-home', { products: products, keyword: '', minPrice: minPrice, maxPrice: maxPrice, customer: req.user , img: img, orderSuccess: req.flash('orderSuccess'), orderError: req.flash('orderError')});
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
      let shipper = null;
      let orders = null;
      let customers = null;
      
      async function getData() {
        await Customer.find()
          .then((data) => {
            customers = data;
          })
          .catch((err) => next(err));

        await Shipper.findOne({account: req.user._id})
          .then((data) => {
            shipper = data;
          })
          .catch((err) => next(err));
        await Order.find({hub: shipper.hub, status: 'active'})
          .then((data) => {
            orders = data;
            if (orders.length != 0) {
              orders.forEach(order => {
                order.customer = customers.find(customer => String(customer.account) == String(order.customer));
              })
            }
          })
          .catch((err) => next(err));
      }

      getData()
        .then(() => {
          res.render('shipper/shipper-home', {shipper: shipper, orders: orders})
        })
        .catch((err) => next(err));
    }
  }

  // [GET] "/search?keyword="
  searchResult(req, res, next) {
    // console.log(req.query.keyword);
    let img = [];
    if (req.user.role === 'customer') {
      Product.find({
        // $or: [  // find a match in the product's name
        name: { $regex: new RegExp(req.query.keyword ?? '', 'i') } 
        // ]
      })
        .then((products) => {
          if (products.length != 0) {
            // Get only available product
            products.filter((product) => product.quantity > 0);
  
            // Get the filtered products
            products = products.filter((product) => { return (product.price >= (req.query.minPrice ?? 0) && product.price <= (req.query.maxPrice ?? 999)) });
            
            // Attach imgSrc property to each product
            products.forEach((product) => {
              if (product.picture) {
                product.imgSrc = getImgSrc(product.picture);
                img.push(product.imgSrc);
              } else img.push('');
            });
          }

          res.render('customer/customer-search', { 
            products: products,
            keyword: req.query.keyword,
            minPrice: req.query.minPrice,
            maxPrice: req.query.maxPrice,
            customer: req.user, 
            img: img,
            orderSuccess: req.flash('orderSuccess'),
            orderError: req.flash('orderError')
          });
        })
        .catch((err) => {
          next(err);
        });
    }

    if (req.user.role === 'vendor') {
      const curVendor = req.vendor;
      Product.find({
        $and: [ // find a match in the product's name or description while belong to the vendor via _id
          { ownership: req.vendor._id },
          {
            $or: [
              {name: { $regex : new RegExp(req.query.keyword, 'i') }},
              // {description: { $regex : new RegExp(req.query.search, 'i') }}
            ]
          }
        ]
      })
        .then((products) => {
          if (products.length != 0) {
            // Attach imgSrc property to each product
            // => View get product.imgSrc to put into image tag
            products.forEach((product) => {
              const imgSrc = getImgSrc(product.picture);
              if (imgSrc) {
                product.imgSrc = imgSrc;
              }
            });
            res.render('vendor/vendor-home', { products: products });
          }
          else {
            // handle search result empty
            res.render('resource-not-found');
          }
        })
        .catch((err) => {
          next(err);
        });
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

  // [GET] "/privacy"
  showPrivacy(req, res, next) {
    res.render('privacy')
  }
}

module.exports = new SiteService();
