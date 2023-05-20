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

const route = require('express').Router();
const productController = require('../controller/ProductController');
const { handleFileUploadMiddleware } = require('../middleware/handleFileUpload');

// Route can access after authentication
// Product routes
route.get('/:id', productController.showProduct);

route.use((req, res, next) => {
  if (!req.isAuthenticated()) {
      res.redirect('/login');
  } else {
      next();
  }
});

// Route can access after authentication
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


module.exports = route;
