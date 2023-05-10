const route = require('express').Router();
const productController = require('../controller/ProductController');
const { handleFileUploadMiddleware } = require('../middleware/handleFileUpload');

// Product routes
route.get('/add', productController.showAddNewProduct);
route.post(
  '/add',
  handleFileUploadMiddleware.single('productpicture'),
  productController.addNewProduct
);
route.get('/:id/edit', productController.showEditProduct);
route.put(
  '/:id/edit',
  handleFileUploadMiddleware.single('productpicture'),
  productController.editProduct
);
route.delete('/:id', productController.deleteProduct);

route.get('/:id', productController.showProduct);

module.exports = route;
