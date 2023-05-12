const route = require('express').Router();
const customerController = require('../controller/CustomerController');

/**
 * Authenticate role
 * Only user.role="customer" can access all the routes in this module
 */
route.use((req, res, next) => {
  if (req.user.role !== 'customer') {
    res.render('resource-access-unauthorized');
    return;
  } else {
    next();
  }
});

// Cutomer routes after authentication
route.get('/profile', customerController.showProfile);
route.get('/order', customerController.showOrder);

module.exports = route;
