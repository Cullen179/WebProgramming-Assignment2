const mongoose = require('mongoose');
const Vendor = require('../model/VendorModel');
const Product = require('../model/ProductModel');
const { getImgSrc, getPictureObject } = require('../../utils/imgTransformation');

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
    const user = req.user;

    if (user.role === 'customer') {
      res.render('customer/customer-view-product');
      return;
    }

    if (user.role === 'vendor') {
      res.render('vendor/vendor-view-product');
      return;
    }

    if (user.role === 'shipper') {
      res.render('shipper/shipper-view-product');
      return;
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
