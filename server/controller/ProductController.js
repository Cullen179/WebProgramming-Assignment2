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
const Vendor = require('../model/VendorModel');
const User = require('../model/UserModel');
const Product = require('../model/ProductModel');
const Order = require('../model/OrderModel');
const { getImgSrc, getPictureObject } = require('../../utils/imgTransformation');
const attachProduct = require('./CartController');

class ProductController {
  constructor() {
    this.showAddNewProduct = this.showAddNewProduct.bind(this);
    this.addNewProduct = this.addNewProduct.bind(this);
    this.showEditProduct = this.showEditProduct.bind(this);
    this.editProduct = this.editProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  // [GET] "/product/:slug"
  showProduct(req, res, next) {
    const productID = req.params.id;
    let detail = null;

    if (!req.isAuthenticated()) {
      let getData = async () => {
        await Product.find()
          .then(data => {
            detail = data.find(product => product._id.toString() === productID);
            if (detail.picture) {
              detail.imgSrc = getImgSrc(detail.picture);
            }
          }
          ).catch(err => next(err));
      };
      getData()
        .then(() => {
          if (!detail) {
            res.render('resource-not-found');
            return;
          }
          res.render('general-view-product', {detail: detail});
        })
        .catch(err => next(err));
        return;
    }

    else if (req.user.role === 'customer') {

      let productsArray = null;

      let getData = async () => {
        await Product.find()
          .then(data => {

            productsArray = attachProduct(data);

            detail = data.find(product => product._id.toString() === productID);
            if (detail.picture) {
              detail.imgSrc = getImgSrc(detail.picture);
            }
          }
          ).catch(err => next(err));
        
      };
      getData()
        .then(() => {
            if (!detail) {
              res.render('resource-not-found');
              return;
            }
            res.render('customer/customer-view-product', {products: productsArray, customer: req.user, detail: detail});
        })
        .catch(err => next(err));
    }
  }

  // [GET] "product/add"
  showAddNewProduct(req, res, next) {
    if (!this.isVendor(req, res, next)) {
      res.render('resource-access-unauthorized');
      return;
    }

    res.render('vendor/vendor-add-product');
  }

  // [POST] "product/add"
  addNewProduct(req, res, next) {
    if (!this.isVendor(req, res, next)) {
      res.render('resource-access-unauthorized');
      return;
    }

    // Resolve final picture
    const pictureFromUser = getPictureObject(req, res, next);

    const curVendor = req.vendor;
    const productName = req.body.productname;
    const productPrice = req.body.productprice;
    const productDescription = req.body.productdescription;
    const productQuantity = req.body.productquantity;
    const productPicture = pictureFromUser;

    // Create product
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      ownership: curVendor._id,
      name: productName,
      price: productPrice,
      quantity: productQuantity,
      description: productDescription,
    });

    // If the picture is uploaded => save it to the product
    if (productPicture) {
      product.picture = productPicture;
    }

    // Save product
    product
      .save()
      .then(() => {
        // After save go back home
        res.redirect('/');
      })
      .catch((err) => next(err));
  }

  // [GET] "product/:id/edit"
  showEditProduct(req, res, next) {
    if (!this.isVendor(req, res, next)) {
      res.render('resource-access-unauthorized');
      return;
    }

    const productId = req.params.id;

    Product.findOne({ _id: productId })
      .then((product) => {

        // If product not found => render 404
        if (!product) {
          res.render('resource-not-found');
          return;
        }
        // Attach imgSrc property to product
        // => View get product.imgSrc to put into image tag
        const imgSrc = getImgSrc(product.picture);
        if (imgSrc) {
          product.imgSrc = imgSrc;
        }

        res.render('vendor/vendor-edit-product', {
          product: product,
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  // [PUT] product/:id/edit"
  editProduct(req, res, next) {
    if (!this.isVendor(req, res, next)) {
      res.render('resource-access-unauthorized');
      return;
    }

    // Resolve final picture
    const pictureObject = getPictureObject(req, res, next);

    const productData = {
      name: req.body.productname,
      price: req.body.productprice,
      description: req.body.productdescription,
      quantity: req.body.productquantity,
    };

    if (pictureObject) {
      productData.picture = pictureObject;
    }

    Product.updateOne({ _id: req.params.id }, productData)
      .then(() => {
        // After update => go back home page
        res.redirect('/');
      })
      .catch((err) => {
        next(err);
      });
  }

  // [DELETE] "product/:id"
  deleteProduct(req, res, next) {
    if (!this.isVendor(req, res, next)) {
      res.render('resource-access-unauthorized');
      return;
    }

    Product.deleteOne({ _id: req.params.id })
      .then(() => {
        Product.deleteOne({ _id: req.params.id })
        // After delete redirect to home
        res.redirect('/');
      })
      .catch((err) => next(err));
  }

  isVendor(req, res, next) {
    return req.user.role === 'vendor';
  }
}

module.exports = new ProductController();
