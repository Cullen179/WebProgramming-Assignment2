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

const User = require('../model/UserModel');
const Shipper = require('../model/ShipperModel');
const Customer = require('../model/CustomerModel');
const Vendor = require('../model/VendorModel');
const Product = require('../model/ProductModel');
const Hub = require('../model/HubModel');
const Order = require('../model/OrderModel');
const passport = require('passport');
const { getImgSrc, getPictureObject } = require('../../utils/imgTransformation');
const attachProduct = require('../controller/CartController');

/**
 * SiteService acts like site controller, includes
 * all function handling general routes
 */
class SiteService {
  // [GET] "/"
  homeRoute(req, res, next) {
    let minPrice = 0, maxPrice = 999999;
    let productsArray = [];
    if (req.user.role === 'customer') {
      Product.find()
        .then((products) => {
          // Get only available product
          products.filter((product) => product.quantity > 0);

          productsArray = attachProduct(products);
         
          res.render('customer/customer-home', { products: productsArray, keyword: '', minPrice: minPrice, maxPrice: maxPrice, customer: req.user, orderSuccess: req.flash('orderSuccess'), orderError: req.flash('orderError')});
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
      let shipper = req.shipper;
      let orders = null;
      let customers = null;
      let hub = null;

      async function getData() {
        await Customer.find()
          .then((data) => {
            customers = data;
          })
          .catch((err) => next(err));

        await Hub.findById(shipper.hub)
          .then((data) => (hub = data))
          .catch((err) => next(err));

        await Order.find({ hub: shipper.hub, status: 'active' })
          .then((data) => {
            orders = data;
            if (orders.length != 0) {
              orders.forEach((order) => {
                order.customer = customers.find(
                  (customer) => String(customer.account) == String(order.customer)
                );
              });
            }
          })
          .catch((err) => next(err));
      }

      getData()
        .then(() => {
          res.render('shipper/shipper-home', { shipper: shipper, hub: hub, orders: orders });
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
        name: { $regex: new RegExp(req.query.keyword ?? '', 'i') },
        // ]
      })
        .then((products) => {
          if (products.length != 0) {
            // Get only available product
            products.filter((product) => product.quantity > 0);

            // Get the filtered products
            products = products.filter((product) => {
              return (
                product.price >= (req.query.minPrice ?? 0) &&
                product.price <= (req.query.maxPrice ?? 999)
              );
            });

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
            orderError: req.flash('orderError'),
          });
        })
        .catch((err) => {
          next(err);
        });
    }

    if (req.user.role === 'vendor') {
      const curVendor = req.vendor;
      Product.find({
        $and: [
          // find a match in the product's name or description while belong to the vendor via _id
          { ownership: req.vendor._id },
          {
            $or: [
              { name: { $regex: new RegExp(req.query.keyword, 'i') } },
              // {description: { $regex : new RegExp(req.query.search, 'i') }}
            ],
          },
        ],
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
          } else {
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
    res.render('about-us');
  }

  // [GET] "/privacy"
  showPrivacy(req, res, next) {
    res.render('privacy');
  }

  // [GET] "/profile"
  showProfile(req, res, next) {
    if (req.user.role === 'customer') {
      let productsArray = [];
    if (req.customer.picture) {
      req.customer.imgSrc = getImgSrc(req.customer.picture);
    }

    Product.find()
        .then(data => {
          productsArray = attachProduct(data);
          res.render('customer/customer-profile', {
            products: productsArray,
            user: req.user,
            customer: req.customer,
            orderSuccess: req.flash('orderSuccess'),
            orderError: req.flash('orderError'),
          });
        })
        .catch((err) => console.log(err));
    }

    if (req.user.role === 'vendor') {
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

    if (req.user.role === 'shipper') {
      const curUser = req.user;
      const curShipper = req.shipper;

      // Attach imgSrc property to shipper
      if (curShipper.picture) {
        curShipper.imgSrc = getImgSrc(curShipper.picture);
      }

      // Get hub
      Hub.findById(curShipper.hub)
        .then((hub) => {
          res.render('shipper/shipper-profile', {
            user: curUser,
            shipper: curShipper,
            hub: hub,
          });
        })
        .catch((err) => next(err));
    }
  }

  // [GET] "/profile/edit"
  showEditProfile(req, res, next) {
    if (req.user.role === 'customer') {
      let productsArray = [];
    if (req.customer.picture) {
      req.customer.imgSrc = getImgSrc(req.customer.picture);
    }

    Product.find()
        .then(data => {
          productsArray = attachProduct(data);
          res.render('customer/customer-edit-profile', {
            products: productsArray,
            user: req.user,
            customer: req.customer,
            orderSuccess: req.flash('orderSuccess'),
            orderError: req.flash('orderError'),
          });
        })
        .catch((err) => next(err));
    }

    if (req.user.role === 'vendor') {
      // Attach imgSrc property to vendor
      // => View get product.imgSrc to put into image tag
      const user = req.user;
      const vendor = req.vendor;
      if (vendor.picture) {
        vendor.imgSrc = getImgSrc(vendor.picture);
      }
      res.render('vendor/vendor-edit-profile', { 
        user: user, 
        vendor: vendor,
        nameError: req.flash('nameError'),
        addressError: req.flash('addressError'), 
      });
    }

    if (req.user.role === 'shipper') {
      const curShipper = req.shipper;

      // Attach imgSrc property to shipper
      if (curShipper.picture) {
        curShipper.imgSrc = getImgSrc(curShipper.picture);
      }

      // Get hub
      Hub.find()
        .then((hubs) => {
          res.render('shipper/shipper-edit-profile', {
            shipper: curShipper,
            hubs: hubs,
          });
        })
        .catch((err) => next(err));
    }
  }

  // [PUT] "/profile/edit"
  editProfile(req, res, next) {
    if (req.user.role === 'customer') {
      const pictureObject = getPictureObject(req, res, next);

      const customerData = {
        name: req.body.customerName,
        address: req.body.customerAddress,
      };
      if (pictureObject) {
        customerData.picture = pictureObject;
      }

      Customer.updateOne({ _id: req.customer._id }, customerData)
        .then(() => {
          res.redirect('/profile');
        })
        .catch((err) => next(err));
    }

    if (req.user.role === 'vendor') {
      const curVendor = req.vendor;
      const pictureObject = getPictureObject(req, res, next);

      // Check duplicate business name first
      Vendor.find({$or: [{businessName: req.body.businessname}, {businessAddress: req.body.businessaddress}], _id: { $ne: curVendor._id }})
        .then((vendor) => {

          // If exists vendor with the updated bussiness name => Reject updating
          if (vendor.length > 0) {
            
            vendor.forEach((vendorProfile) => {
              console.log(vendorProfile.businessName)
              if (vendorProfile.businessName == req.body.businessname ) {
                req.flash('nameError', `Business name ${req.body.businessname} has already been used.`);
              }

              if (vendorProfile.businessAddress == req.body.businessaddress) {
                req.flash('addressError', `Business address ${req.body.businessaddress} has already been used.`);
              }
            })
            res.redirect('/profile/edit');

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
            res.redirect('/profile');
          })
          .catch((err) => next(err));
      }
    }

    if (req.user.role === 'shipper') {
      const curShipper = req.shipper;
      const pictureObject = getPictureObject(req, res, next);

      let shipperData = {
        hub: req.body.shipperHub,
      }

      if (pictureObject) {
        shipperData.picture = pictureObject;
      }

      // Update shipper
      Shipper.updateOne({ _id: curShipper._id }, shipperData)
        .then(() => {
          res.redirect('/profile');
        })
        .catch((err) => next(err));
    }
  }
}

module.exports = new SiteService();
