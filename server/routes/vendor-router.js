const route = require('express').Router();
const vendorController = require('../controller/VendorController');
const { handleFileUploadMiddleware } = require('../middleware/handleFileUpload');

/**
 * Authenticate role
 * Only user.role="vendor" can access all the routes in this module
 */
route.use((req, res, next) => {
  if (req.user.role !== 'vendor') {
    res.render('resource-access-unauthorized');
    return;
  } else {
    next();
  }
});

// Shipper routes after authentication
route.get('/profile', vendorController.showProfile);
route.get('/add-product', vendorController.showAddNewProduct);
route.post('/add-product', vendorController.addNewProduct);
route.get('/profile/edit', vendorController.showEditProfile);
// route.put(
//   '/profile/edit',
//   handleFileUploadMiddleware.single('picture'),
//   vendorController.editProfile
// );
route.delete('/profile', vendorController.deleteAccount);

module.exports = route;
