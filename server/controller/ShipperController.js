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

const mongoose = require('mongoose');
const User = require('../model/UserModel');
const Customer = require('../model/CustomerModel');
const Shipper = require('../model/ShipperModel');
const Hub = require('../model/HubModel');
const Order = require('../model/OrderModel');
const Product = require('../model/ProductModel');
const generatePassword = require('../../utils/passwordUtils').generatePassword;
const siteService = require('../service/render');
const { getImgSrc, getPictureObject } = require('../../utils/imgTransformation');

class ShipperController {

  // [GET] "/shipper/order/:id"
  showOrder(req, res, next) {
    let shipper = req.shipper;
    let order = null;
    let customers = null;
    let products = null;
    
    async function getData() {
      await Customer.find()
        .then((data) => {
          customers = data;
        })
        .catch((err) => next(err));

      await Product.find()
        .then((data) => {
          products = data;
        })
        .catch((err) => next(err));

      await Order.findOne({_id: req.params.id})
        .then((data) => {
          order = data;
          order.productDetails = [];
          if (String(order.hub) != String(shipper.hub) || order.status != "active") {
            res.render('resource-access-unauthorized');
            return;
          } else {
              order.customer = customers.find(customer => String(customer.account) == String(order.customer));
              for (let i = 0; i < order.product.length; i++ ) {
                let product = products.find(p => String(p._id) == String(order.product[i]));
                if (product.picture) {
                  product.imgSrc = getImgSrc(product.picture);
                }
                
                order.productDetails[i] = {};
                order.productDetails[i].name = product.name;
                order.productDetails[i].imgSrc = product.imgSrc;
                order.productDetails[i].description = product.description;
                order.productDetails[i].price = product.price;
              }
          }
        })
        .catch((err) => next(err));
    }

    getData()
      .then(() => {
        res.render('shipper/shipper-view-order', {order: order})
      })
      .catch((err) => next(err));
  }

  // [PUT] '/' for shipper
  updateOrderStatus(req, res, next) {
    if (req.user.role != 'shipper') {
      res.render('resource-not-found');
    } else {
      const orderID = req.body.orderID;
      const orderAction = req.body.orderAction;

      function updateProduct(products) {
        
        Product.findByIdAndUpdate({_id: {$in: products}}, { $inc: { quantity: 1 } })
          .catch(err => next(err))
      }

      Order.findOneAndUpdate({_id: orderID}, {status: orderAction})
        .then((order) => {
          if (orderAction == 'canceled') {
            
            Product.updateMany({_id: {$in: order.product}}, { $inc: { quantity: 1 } })
              .catch(err => next(err))
          }

          req.flash('updateOrder', `Update order ${order._id} status to ${order.status} successfully!`);
          res.redirect('/');
        })
        .catch((err) => {
          next(err);
        })
    }
  }

  // [GET] "/shipper/register"
  showRegistration(req, res, next) {
    let users = null;
    let hubs = null;

    let getData = async () => {
      await User.find()
        .then((data) => {
          users = data;
        })
        .catch((err) => next(err));

      await Hub.find()
        .then((data) => {
          hubs = data;
        })
        .catch((err) => next(err));
    };
    getData()
      .then(() => {
        res.render('shipper/shipper-register', { users, hubs });
      })
      .catch((err) => next(err));
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
