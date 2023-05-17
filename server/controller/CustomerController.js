const mongoose = require('mongoose');
const User = require('../model/UserModel');
const Customer = require('../model/CustomerModel');
const Product = require('../model/ProductModel');
const Order = require('../model/OrderModel');
const Hub = require('../model/HubModel');
const generatePassword = require('../../utils/passwordUtils').generatePassword;
const siteService = require('../service/render');
const { getImgSrc, getPictureObject } = require('../../utils/imgTransformation');
const attachProduct = require('./CartController');

class CustomerController {
  // [GET] "/customer/profile"
  showProfile(req, res, next) {
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
    };

  // [PUT] "/customer/profile"
  editProfile(req, res, next) {
    const curCustomer = req.customer;
    const pictureObject = getPictureObject(req, res, next);

    const customerData = {};

    if (pictureObject) {
      customerData.picture = pictureObject;
    }
    if (req.body.customername) {
      customerData.name = req.body.customername;
    }
    if (req.body.customeraddress) {
      customerData.address = req.body.customeraddress;
    }

    Customer.updateOne({ _id: curCustomer._id }, customerData)
      .then(() => {
        res.redirect('/customer/profile');
        return;
      })
      .catch((err) => next(err));
  }

  // [GET] "/customer/register"
  showRegistration(req, res, next) {
    let users = null;

    let getData = async () => {
      await User.find()
        .then((data) => {
          users = data;
        })
        .catch((err) => console.log(err));
    };
    getData()
      .then(() => {
        res.render('customer/customer-register', { users });
      })
      .catch((err) => console.log(err));
  }

  showOrder(req, res, next) {
    let orders = null;
    let productsArray = [];

    let getData = async () => {
      await Product.find()
        .then((data) => {
          productsArray = attachProduct(data);
        })
        .catch((err) => console.log(err));

      await Order.find({ customer: req.user._id })
        .then((data) => {
          orders = data;
        })
        .catch((err) => next(err));
    };
    getData()
      .then(() => {
        res.render('customer/customer-order', {
          products: productsArray,
          customer: req.user,
          orders: orders,
          orderSuccess: req.flash('orderSuccess'),
          orderError: req.flash('orderError'),
        });
      })
      .catch(err => next(err));
    // res.render('test')
  };

  createOrder(req, res, next) {
    if (req.user.role != 'customer') {
      res.render('resource-access-unauthorized');
      return;
    }

    async function getRandomHub() {
      let hub;
      await Hub.find()
        .then((hubs) => {
          hub = hubs[Math.floor(Math.random() * hubs.length)];
        })
        .catch((err) => next(err));
      return hub;
    }
    const productOrder = JSON.parse(req.body.order).products;
    const price = JSON.parse(req.body.order).price;

    Product.find({ _id: { $in: productOrder } }).then((products) => {
      // Check if product is available
      if (products.some((product) => product.quantity == 0)) {
        req.flash(
          'orderError',
          'There is/are (a) product(s) in your order that is/are out of stock. Please choose a different product.'
        );
        res.redirect('/');
      } else {
        // Create order
        let randomHub;
        getRandomHub()
          .then((hub) => {
            randomHub = hub;
            saveOrder();
          })
          .catch((err) => next(err));

        function saveOrder() {
          const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            customer: req.user._id,
            product: productOrder,
            price: price,
            hub: randomHub._id,
            status: 'active',
          });

          // Save order
          order
            .save()
            .then(() => {
              req.flash(
                'orderSuccess',
                `Your order has been placed successfully at ${randomHub.name}.`
              );
              res.redirect('/');
              Product.updateMany({ _id: { $in: productOrder } }, { $inc: { quantity: -1 } })
                .then()
                .catch((err) => next(err));
            })
            .catch((err) => next(err));
        }
      }
    });
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
