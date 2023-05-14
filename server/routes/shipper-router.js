const route = require('express').Router();
const shipperController = require('../controller/ShipperController');
const { handleFileUploadMiddleware } = require('../middleware/handleFileUpload');

/**
 * Authenticate role
 * Only user.role="shipper" can access all the routes in this module
 */
route.use((req, res, next) => {
  if (req.user.role !== 'shipper') {
    res.render('resource-access-unauthorized');
    return;
  } else {
    next();
  }
});

// Shipper routes after authentication
route.get('/profile', shipperController.showProfile);
route.put('/profile', handleFileUploadMiddleware.single('picture'), shipperController.editProfile);
route.get('/order', shipperController.showOrder);

module.exports = route;
