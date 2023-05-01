const route = require('express').Router();
const shipperController = require('../controller/ShipperController');

/**
 * Authenticate role
 * Only user.role="shipper" can access all the routes in this module
 */
route.use((req, res, next) => {
  if (req.user.role !== 'shipper') {
    res.render('resource-access-unauthorized');
  } else {
    next();
  }
});

// Shipper routes after authentication
route.get('/profile', shipperController.showProfile);

module.exports = route;
