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

module.exports = route;
