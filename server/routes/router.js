const route = require('express').Router();
const siteService = require('../service/render');
const shipperController = require('../controller/ShipperController');
const customerController = require('../controller/CustomerController');
const vendorController = require('../controller/VendorController');

// Route can access before authentication
route.get('/login', siteService.showLogin);
route.post('/login', siteService.login);
route.get('/shipper/register', shipperController.showRegistration);
route.post('/shipper/register', shipperController.createAccount);
route.get('/customer/register', customerController.showRegistration);
route.post('/customer/register', customerController.createAccount);
route.get('/vendor/register', vendorController.showRegistration);
route.post('/vendor/register', vendorController.createAccount);

/**
 * ---------------- Authentication before access all other routes ----------------
 * */ 
route.use((req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect('/login');
  }

  next();
})

// Home route
route.get('/', siteService.homeRoute);

// Logout
route.get('/logout', siteService.logout);

// Customer routes
route.get('/customer', customerController.getCustomer);

// Shipper routes
// route.post('/api/shipper', controller.createShipper)


module.exports = route;
