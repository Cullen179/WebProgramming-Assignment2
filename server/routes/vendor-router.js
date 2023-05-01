const route = require('express').Router();
const vendorController = require('../controller/VendorController');

/**
 * Authenticate role
 * Only user.role="vendor" can access all the routes in this module
 */
route.use((req, res, next) => {
  if (req.user.role !== 'vendor') {
    res.render('resource-access-unauthorized');
  } else {
    next();
  }
});

// Shipper routes after authentication
route.get('/profile', vendorController.showProfile);
route.get('/addnewproduct', vendorController.showAddNewProduct);
route.post('/addnewproduct', vendorController.addNewProduct);
route.get('/profile/edit', vendorController.showEditProfile);
route.post('/profile/edit', vendorController.editProfile);

module.exports = route;
