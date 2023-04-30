const route = require('express').Router();
const customerController = require('../controller/CustomerController');

/**
 * Authenticate role
 * Only user.role="customer" can access all the routes in this module
 */
route.use((req, res, next) => {
  if (req.user.role !== 'customer') {
    res.render('resource-access-unauthorized');
  } else {
    next();
  }
});

// Shipper routes after authentication
route.get('/profile', customerController.showProfile);

module.exports = route;
